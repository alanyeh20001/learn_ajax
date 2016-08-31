class PasswordsController < Devise::PasswordsController
  # POST /resource/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      respond_to do |format|
        format.json { render json: {}, status: :ok }
        format.html { respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name)) }
      end
    else
      respond_to do |format|
        format.json { render json: resource.errors.full_messages, status: :unprocessable_entity }
        format.html { respond_with(resource) }
      end
    end
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        sign_in(resource_name, resource)
      end

      respond_to do |format|
        format.json { render json: { url: root_url }, status: :ok }
        format.html { respond_with resource, location: after_resetting_password_path_for(resource) }
      end
    else
      set_minimum_password_length

      respond_to do |format|
        format.json { render json: resource.errors.full_messages, status: :unprocessable_entity }
        format.html { respond_with resource }
      end
    end
  end
end
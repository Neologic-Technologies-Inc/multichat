class DashboardAppTokenService
  TOKEN_LIFETIME = 2.minutes

  def initialize(account:, conversation:, user:, audience:)
    @account = account
    @conversation = conversation
    @user = user
    @audience = audience
  end

  def generate
    JWT.encode(payload, private_key, 'RS256', { kid: key_id })
  end

  private

  attr_reader :account, :conversation, :user, :audience

  def payload
    now = Time.current.to_i

    {
      iss: ENV.fetch('FRONTEND_URL'),
      aud: audience,
      sub: "dashboard-app-agent:#{user.id}",
      account_id: account.id.to_s,
      conversation_id: conversation.id.to_s,
      contact_id: conversation.contact_id.to_s,
      iat: now,
      exp: now + TOKEN_LIFETIME.to_i,
      jti: SecureRandom.uuid
    }
  end

  def private_key
    OpenSSL::PKey::RSA.new(Base64.strict_decode64(ENV.fetch('DASHBOARD_APP_TOKEN_PRIVATE_KEY')))
  end

  def key_id
    ENV.fetch('DASHBOARD_APP_TOKEN_KEY_ID')
  end
end

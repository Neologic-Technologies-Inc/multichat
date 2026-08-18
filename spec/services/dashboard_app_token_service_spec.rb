require 'rails_helper'

RSpec.describe DashboardAppTokenService do
  let(:account) { create(:account) }
  let(:conversation) { create(:conversation, account: account) }
  let(:user) { create(:user, account: account) }
  let(:private_key) { OpenSSL::PKey::RSA.new(2048) }

  it 'issues an RS256 token bound to the dashboard app origin and conversation context' do
    with_modified_env(
      DASHBOARD_APP_TOKEN_KEY_ID: 'test-key',
      DASHBOARD_APP_TOKEN_PRIVATE_KEY: Base64.strict_encode64(private_key.to_pem),
      FRONTEND_URL: 'https://chat.example.com'
    ) do
      token = described_class.new(
        account: account,
        conversation: conversation,
        user: user,
        audience: 'https://dashboard.example.com'
      ).generate

      payload, header = JWT.decode(token, private_key.public_key, true, algorithm: 'RS256')

      expect(header['kid']).to eq('test-key')
      expect(payload).to include(
        'iss' => 'https://chat.example.com',
        'aud' => 'https://dashboard.example.com',
        'sub' => "dashboard-app-agent:#{user.id}",
        'account_id' => account.id.to_s,
        'conversation_id' => conversation.id.to_s,
        'contact_id' => conversation.contact_id.to_s
      )
      expect(payload['exp']).to be > payload['iat']
    end
  end
end

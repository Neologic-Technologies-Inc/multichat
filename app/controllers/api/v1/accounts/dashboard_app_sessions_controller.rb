class Api::V1::Accounts::DashboardAppSessionsController < Api::V1::Accounts::BaseController
  def create
    dashboard_app = Current.account.dashboard_apps.find(params.require(:dashboard_app_id))
    conversation = Current.account.conversations.find(params.require(:conversation_id))
    authorize conversation, :show?

    frame_url = params.require(:frame_url)
    raise ActiveRecord::RecordNotFound unless dashboard_app.content.any? { |item| item['url'] == frame_url }

    render json: {
      token: DashboardAppTokenService.new(
        account: Current.account,
        conversation: conversation,
        user: Current.user,
        audience: URI.parse(frame_url).origin
      ).generate
    }
  end
end

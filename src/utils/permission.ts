export enum Action {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  MANAGE = 'manage',
}

export const AppPermissions = {
  USER_VIEW: 'user.view',
  USER_CREATE: 'user.create',
  USER_EDIT: 'user.edit',
  USER_DELETE: 'user.delete',
  
  GROUP_VIEW: 'group.view',
  GROUP_CREATE: 'group.create',
  GROUP_EDIT: 'group.edit',
  GROUP_DELETE: 'group.delete',
  GROUP_MANAGE: 'group.manage',

  PERMISSION_VIEW: 'permission.view',
  PERMISSION_CREATE: 'permission.create',
  PERMISSION_EDIT: 'permission.edit',
  PERMISSION_DELETE: 'permission.delete',
  PERMISSION_MANAGE: 'permission.manage',

  HERO_SECTION_EDIT: 'hero_section.edit',
  ACHIEVEMENT_EDIT: 'achievement.edit',
  CLIENT_CREATE: 'client.create',
  CLIENT_EDIT: 'client.edit',
  CLIENT_DELETE: 'client.delete',

  PORTFOLIO_SECTION_EDIT: 'portfolio_section.edit',

  PORTFOLIO_VIEW: 'portfolio.view',
  PORTFOLIO_CREATE: 'portfolio.create',
  PORTFOLIO_EDIT: 'portfolio.edit',
  PORTFOLIO_DELETE: 'portfolio.delete',

  SERVICE_SECTION_EDIT: 'service_section.edit',

  SERVICE_VIEW: 'service.view',
  SERVICE_CREATE: 'service.create',
  SERVICE_EDIT: 'service.edit',
  SERVICE_DELETE: 'service.delete',

  SERVICE_PROCESS_CREATE: 'service_process.create',
  SERVICE_PROCESS_EDIT: 'service_process.edit',
  SERVICE_PROCESS_DELETE: 'service_process.delete',

  SUB_SERVICE_CREATE: 'sub_service.create',
  SUB_SERVICE_EDIT: 'sub_service.edit',
  SUB_SERVICE_DELETE: 'sub_service.delete',

  SERVICE_EXCELLENCE_CREATE: 'service_excellence.create',
  SERVICE_EXCELLENCE_EDIT: 'service_excellence.edit',
  SERVICE_EXCELLENCE_DELETE: 'service_excellence.delete',

  QA_CREATE: 'qa.create',
  QA_EDIT: 'qa.edit',
  QA_DELETE: 'qa.delete',

  ABOUT_OUR_EDIT: 'about_our.edit',
  WHY_WE_EDIT: 'why_we.edit',
  CALL_TO_ACTION_EDIT: 'call_to_action.edit',

  ARTICLE_VIEW: 'article.view',
  ARTICLE_CREATE: 'article.create',
  ARTICLE_EDIT: 'article.edit',
  ARTICLE_DELETE: 'article.delete',

  ARTICLE_CATEGORY_VIEW: 'article_category.view',
  ARTICLE_CATEGORY_CREATE: 'article_category.create',
  ARTICLE_CATEGORY_EDIT: 'article_category.edit',
  ARTICLE_CATEGORY_DELETE: 'article_category.delete',

  SEO_METADATA_CREATE: 'seo_metadata.create',
  SEO_METADATA_EDIT: 'seo_metadata.edit',
  SEO_METADATA_DELETE: 'seo_metadata.delete',
  WEB_SETTING_EDIT: 'web_setting.edit',

  CONTACT_SECTION_EDIT: 'contact_section.edit',
  CONTACT_INFORMATION_EDIT: 'contact_information.edit',
  CONTACT_FORM_VIEW: 'contact_form.view',
  CONTACT_FORM_DELETE: 'contact_form.delete',

  SOCIAL_MEDIA_CREATE: 'social_media.create',
  SOCIAL_MEDIA_EDIT: 'social_media.edit',
  SOCIAL_MEDIA_DELETE: 'social_media.delete',

} as const;

export const ALL_PERMISSION_NAMES: string[] = Object.values(AppPermissions);
export type PermissionValue = typeof AppPermissions[keyof typeof AppPermissions];
export enum Action {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  MANAGE = 'manage', // All in one for 'create', 'view', 'edit', 'delete'
}


// Helps maintain consistency
export const Resources = {
  USER: 'user',
  GROUP: 'group',
  PERMISSION: 'permission',
  HERO_SECTION: 'hero_section',
  ACHIEVEMENT: 'achievement',
  CLIENT: 'client',
  PORTFOLIO: 'PORTFOLIO', 
  PORTFOLIO_SECTION: 'portfolio_section',
  SERVICE: 'SERVICE', 
  SERVICE_SECTION: 'service_section',
  SERVICE_PROCESS: 'service_process',
  SUB_SERVICE: 'sub_service',
  SERVICE_EXCELLENCE: 'service_excellence',
  QA: 'qa',
  ABOUT_OUR: 'about_our',
  WHY_WE: 'why_we',
  CALL_TO_ACTION: 'call_to_action',
  ARTICLE_ITEM: 'article_item',
  ARTICLE_CATEGORY: 'article_category',
  SEO_METADATA: 'seo_metadata',
  WEB_SETTING: 'web_setting',
  CONTACT_SECTION: 'contact_section',
  CONTACT_INFORMATION: 'contact_information',
  CONTACT_FORM: 'contact_form',
  SOCIAL_MEDIA: 'social_media',
} as const;

// All permission
export const AppPermissions = {

  // User permission
  [Resources.USER + '_' + Action.VIEW.toUpperCase()]: `${Resources.USER}.${Action.VIEW}`,
  [Resources.USER + '_' + Action.CREATE.toUpperCase()]: `${Resources.USER}.${Action.CREATE}`,
  [Resources.USER + '_' + Action.EDIT.toUpperCase()]: `${Resources.USER}.${Action.EDIT}`,
  [Resources.USER + '_' + Action.DELETE.toUpperCase()]: `${Resources.USER}.${Action.DELETE}`,
  
  // Group permission
  [Resources.GROUP + '_' + Action.VIEW.toUpperCase()]: `${Resources.GROUP}.${Action.VIEW}`,
  [Resources.GROUP + '_' + Action.CREATE.toUpperCase()]: `${Resources.GROUP}.${Action.CREATE}`,
  [Resources.GROUP + '_' + Action.EDIT.toUpperCase()]: `${Resources.GROUP}.${Action.EDIT}`,
  [Resources.GROUP + '_' + Action.DELETE.toUpperCase()]: `${Resources.GROUP}.${Action.DELETE}`,
  [Resources.GROUP + '_' + Action.MANAGE.toUpperCase()]: `${Resources.GROUP}.${Action.MANAGE}`, 

  // Permssion 
  [Resources.PERMISSION + '_' + Action.VIEW.toUpperCase()]: `${Resources.PERMISSION}.${Action.VIEW}`,

  // Hero section permission
  [Resources.HERO_SECTION + '_' + Action.EDIT.toUpperCase()]: `${Resources.HERO_SECTION}.${Action.EDIT}`,
  
  // Achievement permission
  [Resources.ACHIEVEMENT + '_' + Action.EDIT.toUpperCase()]: `${Resources.ACHIEVEMENT}.${Action.EDIT}`,
  
  // Client permission
  [Resources.CLIENT + '_' + Action.CREATE.toUpperCase()]: `${Resources.CLIENT}.${Action.CREATE}`,
  [Resources.CLIENT + '_' + Action.EDIT.toUpperCase()]: `${Resources.CLIENT}.${Action.EDIT}`,
  [Resources.CLIENT + '_' + Action.DELETE.toUpperCase()]: `${Resources.CLIENT}.${Action.DELETE}`,

  // Portfolio section permission
  [Resources.PORTFOLIO_SECTION + '_' + Action.EDIT.toUpperCase()]: `${Resources.PORTFOLIO_SECTION}.${Action.EDIT}`,

  // Portfolio permission
  [Resources.PORTFOLIO + '_' + Action.VIEW.toUpperCase()]: `${Resources.PORTFOLIO}.${Action.VIEW}`,
  [Resources.PORTFOLIO + '_' + Action.CREATE.toUpperCase()]: `${Resources.PORTFOLIO}.${Action.CREATE}`,
  [Resources.PORTFOLIO + '_' + Action.EDIT.toUpperCase()]: `${Resources.PORTFOLIO}.${Action.EDIT}`,
  [Resources.PORTFOLIO + '_' + Action.DELETE.toUpperCase()]: `${Resources.PORTFOLIO}.${Action.DELETE}`,

  // Service sections permission
  [Resources.SERVICE_SECTION + '_' + Action.EDIT.toUpperCase()]: `${Resources.SERVICE_SECTION}.${Action.EDIT}`,

  // Service permission
  [Resources.SERVICE + '_' + Action.VIEW.toUpperCase()]: `${Resources.SERVICE}.${Action.VIEW}`,
  [Resources.SERVICE + '_' + Action.CREATE.toUpperCase()]: `${Resources.SERVICE}.${Action.CREATE}`,
  [Resources.SERVICE + '_' + Action.EDIT.toUpperCase()]: `${Resources.SERVICE}.${Action.EDIT}`,
  [Resources.SERVICE + '_' + Action.DELETE.toUpperCase()]: `${Resources.SERVICE}.${Action.DELETE}`,

  // Service process permission
  [Resources.SERVICE_PROCESS + '_' + Action.CREATE.toUpperCase()]: `${Resources.SERVICE_PROCESS}.${Action.CREATE}`,
  [Resources.SERVICE_PROCESS + '_' + Action.EDIT.toUpperCase()]: `${Resources.SERVICE_PROCESS}.${Action.EDIT}`,
  [Resources.SERVICE_PROCESS + '_' + Action.DELETE.toUpperCase()]: `${Resources.SERVICE_PROCESS}.${Action.DELETE}`,

  // Sub service permission
  [Resources.SUB_SERVICE + '_' + Action.CREATE.toUpperCase()]: `${Resources.SUB_SERVICE}.${Action.CREATE}`,
  [Resources.SUB_SERVICE + '_' + Action.EDIT.toUpperCase()]: `${Resources.SUB_SERVICE}.${Action.EDIT}`,
  [Resources.SUB_SERVICE + '_' + Action.DELETE.toUpperCase()]: `${Resources.SUB_SERVICE}.${Action.DELETE}`,

  // Service excellence permission
  [Resources.SERVICE_EXCELLENCE + '_' + Action.CREATE.toUpperCase()]: `${Resources.SERVICE_EXCELLENCE}.${Action.CREATE}`,
  [Resources.SERVICE_EXCELLENCE + '_' + Action.EDIT.toUpperCase()]: `${Resources.SERVICE_EXCELLENCE}.${Action.EDIT}`,
  [Resources.SERVICE_EXCELLENCE + '_' + Action.DELETE.toUpperCase()]: `${Resources.SERVICE_EXCELLENCE}.${Action.DELETE}`,

  // Qa permission
  [Resources.QA + '_' + Action.CREATE.toUpperCase()]: `${Resources.QA}.${Action.CREATE}`,
  [Resources.QA + '_' + Action.EDIT.toUpperCase()]: `${Resources.QA}.${Action.EDIT}`,
  [Resources.QA + '_' + Action.DELETE.toUpperCase()]: `${Resources.QA}.${Action.DELETE}`,

  // About our permission
  [Resources.ABOUT_OUR + '_' + Action.EDIT.toUpperCase()]: `${Resources.ABOUT_OUR}.${Action.EDIT}`,

  // Why we permission
  [Resources.WHY_WE + '_' + Action.EDIT.toUpperCase()]: `${Resources.WHY_WE}.${Action.EDIT}`,

  // Call to action permission
  [Resources.CALL_TO_ACTION + '_' + Action.EDIT.toUpperCase()]: `${Resources.CALL_TO_ACTION}.${Action.EDIT}`,

  // Articles permission
  [Resources.ARTICLE_ITEM + '_' + Action.VIEW.toUpperCase()]: `${Resources.ARTICLE_ITEM}.${Action.VIEW}`,
  [Resources.ARTICLE_ITEM + '_' + Action.CREATE.toUpperCase()]: `${Resources.ARTICLE_ITEM}.${Action.CREATE}`,
  [Resources.ARTICLE_ITEM + '_' + Action.EDIT.toUpperCase()]: `${Resources.ARTICLE_ITEM}.${Action.EDIT}`,
  [Resources.ARTICLE_ITEM + '_' + Action.DELETE.toUpperCase()]: `${Resources.ARTICLE_ITEM}.${Action.DELETE}`,

  // Article category permission  
  [Resources.ARTICLE_CATEGORY + '_' + Action.VIEW.toUpperCase()]: `${Resources.ARTICLE_CATEGORY}.${Action.VIEW}`,
  [Resources.ARTICLE_CATEGORY + '_' + Action.CREATE.toUpperCase()]: `${Resources.ARTICLE_CATEGORY}.${Action.CREATE}`,
  [Resources.ARTICLE_CATEGORY + '_' + Action.EDIT.toUpperCase()]: `${Resources.ARTICLE_CATEGORY}.${Action.EDIT}`,
  [Resources.ARTICLE_CATEGORY + '_' + Action.DELETE.toUpperCase()]: `${Resources.ARTICLE_CATEGORY}.${Action.DELETE}`,

  // Seo permission
  [Resources.SEO_METADATA + '_' + Action.CREATE.toUpperCase()]: `${Resources.SEO_METADATA}.${Action.CREATE}`,
  [Resources.SEO_METADATA + '_' + Action.EDIT.toUpperCase()]: `${Resources.SEO_METADATA}.${Action.EDIT}`,
  [Resources.SEO_METADATA + '_' + Action.DELETE.toUpperCase()]: `${Resources.SEO_METADATA}.${Action.DELETE}`,

  // Web setting permission
  [Resources.WEB_SETTING + '_' + Action.EDIT.toUpperCase()]: `${Resources.WEB_SETTING}.${Action.EDIT}`,

  // Contact section permission
  [Resources.CONTACT_SECTION + '_' + Action.EDIT.toUpperCase()]: `${Resources.CONTACT_SECTION}.${Action.EDIT}`,
  
  // Contact information permission
  [Resources.CONTACT_INFORMATION + '_' + Action.EDIT.toUpperCase()]: `${Resources.CONTACT_INFORMATION}.${Action.EDIT}`,

  // Contact form permission
  [Resources.CONTACT_FORM + '_' + Action.VIEW.toUpperCase()]: `${Resources.CONTACT_FORM}.${Action.VIEW}`,
  [Resources.CONTACT_FORM + '_' + Action.DELETE.toUpperCase()]: `${Resources.CONTACT_FORM}.${Action.DELETE}`,

  // Social media permission
  [Resources.SOCIAL_MEDIA + '_' + Action.CREATE.toUpperCase()]: `${Resources.SOCIAL_MEDIA}.${Action.CREATE}`,
  [Resources.SOCIAL_MEDIA + '_' + Action.EDIT.toUpperCase()]: `${Resources.SOCIAL_MEDIA}.${Action.EDIT}`,
  [Resources.SOCIAL_MEDIA + '_' + Action.DELETE.toUpperCase()]: `${Resources.SOCIAL_MEDIA}.${Action.DELETE}`,

} as const;

export const ALL_PERMISSION_NAMES: string[] = Object.values(AppPermissions);
export type PermissionValue = typeof AppPermissions[keyof typeof AppPermissions];
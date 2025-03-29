interface IPhotosItem {
  id: string
  slug: string
  alternative_slugs: {
    en: string
    es: string
    ja: string
    fr: string
    it: string
    ko: string
    de: string
    pt: string
  }
  created_at: string
  updated_at: string
  promoted_at: null | string
  width: number
  height: number
  color: string
  blur_hash: string
  description: null | string
  alt_description: string
  breadcrumbs: string[]
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
  likes: number
  liked_by_user: boolean
  current_user_collections: string[]
  sponsorship: null | string
  topic_submissions: {
    'street-photography': {
      status: string
      approved_on: string
    }
  }
  asset_type: string
  user: {
    id: string
    updated_at: string
    username: string
    name: string
    first_name: string
    last_name: string
    twitter_username: null | string
    portfolio_url: string
    bio: null | string
    location: string
    links: {
      self: string
      html: string
      photos: string
      likes: string
      portfolio: string
    }
    profile_image: {
      small: string
      medium: string
      large: string
    }
    instagram_username: string
    total_collections: number
    total_likes: number
    total_photos: number
    total_promoted_photos: number
    total_illustrations: number
    total_promoted_illustrations: number
    accepted_tos: boolean
    for_hire: boolean
    social: {
      instagram_username: string
      portfolio_url: string
      twitter_username: null | string
      paypal_email: null | string
    }
  }
}

export interface IPhotos {
  total: number
  total_pages: number
  results: IPhotosItem[]
}

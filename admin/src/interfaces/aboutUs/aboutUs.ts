export interface AboutUsI {
  meta_name:string,
  meta_description:string,
  meta_keyword:string
  contents: OneContentI[]
  images: any[]
}

export interface OneContentI {
  title: string,
  description: string,
}
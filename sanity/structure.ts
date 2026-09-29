import type { StructureResolver } from 'sanity/structure';
export const structure: StructureResolver = (S) => {
  const singleton = (title: string, type: string, id: string) =>
    S.listItem()
      .title(title)
      .id(id === 'siteSettings' && title.startsWith('Contact') ? 'contact-settings' : id)
      .child(S.document().schemaType(type).documentId(id).title(title));
  const cats = (title: string, sex: 'male' | 'female') =>
    S.listItem()
      .title(title)
      .child(
        S.documentTypeList('cat')
          .title(title)
          .filter('_type == "cat" && sex == $sex')
          .params({ sex })
          .initialValueTemplates([S.initialValueTemplateItem(`cat-${sex}`)]),
      );
  const litters = (title: string, statuses: string[], template: string) =>
    S.listItem()
      .title(title)
      .child(
        S.documentTypeList('litter')
          .title(title)
          .filter('_type == "litter" && status in $statuses')
          .params({ statuses })
          .initialValueTemplates([S.initialValueTemplateItem(template)]),
      );
  return S.list()
    .title('Your cattery')
    .items([
      S.listItem()
        .title('Website')
        .child(
          S.list()
            .title('Website')
            .items([
              singleton('Homepage', 'homepage', 'homepage'),
              singleton('Additional Information', 'informationPage', 'informationPage'),
            ]),
        ),
      S.listItem()
        .title('Our Cattery')
        .child(
          S.list()
            .title('Our Cattery')
            .items([cats('Male Cats', 'male'), cats('Female Cats', 'female')]),
        ),
      S.listItem()
        .title('Litters')
        .child(
          S.list()
            .title('Litters')
            .items([
              litters('Planned Litters', ['planned', 'expected'], 'litter-planned'),
              litters('Current Litters', ['current', 'available', 'reserved'], 'litter-current'),
              litters('Previous Litters', ['previous'], 'litter-previous'),
            ]),
        ),
      S.documentTypeListItem('kitten').title('Kittens'),
      S.documentTypeListItem('exhibition').title('Exhibitions'),
      S.documentTypeListItem('galleryImage').title('Gallery'),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              singleton('Site Settings', 'siteSettings', 'siteSettings'),
              singleton('Contact & Social Media', 'siteSettings', 'siteSettings'),
              singleton('Privacy Policy', 'legalPage', 'privacy'),
              singleton('Imprint', 'legalPage', 'imprint'),
            ]),
        ),
    ]);
};

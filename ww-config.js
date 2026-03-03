export default {
  editor: {
    label: 'Entrustia File Tags Cards',
    icon: 'file',
  },
  properties: {
    data: {
      label: { en: 'File Data' },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [],
      options: {
        expandable: true,
        getItemLabel(item) {
          return item.name || 'File ' + (item.id || 'Unknown');
        },
        item: {
          type: 'Object',
          defaultValue: {
            id: 1,
            created_at: '',
            tenant_id: 1,
            folder_id: 1,
            name: 'example.pdf',
            drive_url: '',
            mime_type: '',
            size_bytes: 0,
            ai_tags: [],
            ai_folder_name: ''
          },
          options: {
            item: {
              id: { label: { en: 'ID' }, type: 'Number' },
              created_at: { label: { en: 'Created At' }, type: 'Text' },
              tenant_id: { label: { en: 'Tenant ID' }, type: 'Number' },
              folder_id: { label: { en: 'Folder ID' }, type: 'Number' },
              name: { label: { en: 'File Name' }, type: 'Text' },
              drive_url: { label: { en: 'Drive URL' }, type: 'Text' },
              mime_type: { label: { en: 'MIME Type' }, type: 'Text' },
              size_bytes: { label: { en: 'Size (bytes)' }, type: 'Number' },
              ai_tags: { label: { en: 'AI Tags' }, type: 'Array' },
              ai_folder_name: { label: { en: 'AI Folder Name' }, type: 'Text' }
            }
          }
        }
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Bind to your files collection. Each item must include: id, name, created_at, size_bytes, ai_tags, ai_folder_name, folder_id.'
      }
      /* wwEditor:end */
    },
    dataIdFormula: {
      label: { en: 'ID Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['id']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
    dataNameFormula: {
      label: { en: 'Name Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['name']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
    dataFolderNameFormula: {
      label: { en: 'AI Folder Name Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['ai_folder_name']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
    dataTagsFormula: {
      label: { en: 'AI Tags Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['ai_tags']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
    dataSizeBytesFormula: {
      label: { en: 'Size Bytes Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['size_bytes']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
    dataCreatedAtFormula: {
      label: { en: 'Created At Field Mapping' },
      type: 'Formula',
      section: 'settings',
      options: content => ({
        template: Array.isArray(content.data) && content.data.length > 0 ? content.data[0] : null,
      }),
      defaultValue: { type: 'f', code: "context.mapping?.['created_at']" },
      hidden: (content, sidepanelContent, boundProps) =>
        !Array.isArray(content.data) || !content.data.length || !boundProps.data,
    },
  },
  triggerEvents: [
    {
      name: 'open-click',
      label: { en: 'On Open click' },
      event: { row: {} },
    },
    {
      name: 'edit-click',
      label: { en: 'On Edit click' },
      event: { row: {} },
    },
    {
      name: 'name-click',
      label: { en: 'On File Name click' },
      event: { row: {} },
    },
    {
      name: 'folder-click',
      label: { en: 'On Folder Name click' },
      event: { row: {} },
    },
  ],
};

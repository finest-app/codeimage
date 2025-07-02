const guestLimit = 10,
  userLimit = 10;

export const presets = {
  it: {
    presets: {
      userPresets: 'I tuoi presets',
      updatePreset: {
        label: 'Aggiorna',
        dialogTitle: 'Aggiorna preset',
        dialogMessage:
          "Conferma per aggiornare il preset selezionato con lo stato corrente dell'editor",
        old: 'Vecchio',
        new: 'Nuovo',
      },
      share: {
        label: 'Condividi',
        confirm: 'Link preset copiato',
      },
      renamePreset: {
        label: 'Rinomina',
        confirmTitle: 'Rinomina preset',
        confirmMessage: 'Inserisci un nuovo nome per il preset.',
      },
      addPreset: {
        label: 'Nuovo preset',
        confirmTitle: 'Aggiungi un nuovo preset',
        confirmMessage: 'Inserisci un nome per il tuo preset',
      },
      deletePreset: {
        label: 'Elimina',
        confirmTitle: 'Elimina preset',
        confirmMessage: 'Questa azione non è reversibile.',
      },
      sync: {
        label: 'Salva nel tuo account',
      },
      openPreset: {
        label: 'Mostra i tuoi presets',
      },
      limit: {
        user: {
          label: `Hai raggiunto il limite di preset ${userLimit} per utente`,
        },
        guest: {
          label: `Hai raggiunto il limite di ${guestLimit} preset`,
          actionLabel: `per avere più preset`,
        },
      },
    },
  },
  en: {
    presets: {
      userPresets: '您的预设',
      updatePreset: {
        label: '更新',
        dialogTitle: '更新预设',
        dialogMessage: '确认将所选预设更新到当前编辑器状态',
        old: '旧',
        new: '新',
      },
      share: {
        label: '分享',
        confirm: '预设已复制到剪贴板',
      },
      renamePreset: {
        label: '重命名',
        confirmTitle: '重命名预设',
        confirmMessage: '输入预设新名称。',
      },
      addPreset: {
        label: '添加预设',
        confirmTitle: '添加新预设',
        confirmMessage: '输入预设名称',
      },
      deletePreset: {
        label: '删除',
        confirmTitle: '删除预设',
        confirmMessage: '此操作不可撤销。',
      },
      sync: {
        label: '保存到您的账户',
      },
      openPreset: {
        label: '显示您的预设',
      },
      limit: {
        user: {
          label: `您已达到每个用户最多 ${userLimit} 个预设的限制。`,
        },
        guest: {
          label: `您已达到最多 ${guestLimit} 个预设的限制。`,
          actionLabel: `以提升限额。`,
        },
      },
    },
  },
  de: {
    presets: {
      userPresets: 'Your presets',
      updatePreset: {
        label: 'Update',
        dialogTitle: 'Update preset',
        dialogMessage:
          'Confirm to update the selected preset to the current editor state',
        old: 'Old',
        new: 'New',
      },
      renamePreset: {
        label: 'Rename',
        confirmTitle: 'Rename preset',
        confirmMessage: 'Enter a new name for the preset.',
      },
      addPreset: {
        label: 'Add preset',
        confirmTitle: 'Add a new preset',
        confirmMessage: 'Enter a name for your preset',
      },
      deletePreset: {
        label: 'Delete',
        confirmTitle: 'Delete preset',
        confirmMessage: 'This action is not reversible.',
      },
      sync: {
        label: 'Save in your account',
      },
      openPreset: {
        label: 'Show your presets',
      },
      limit: {
        user: {
          label: `Sie haben das voreingestellte Limit ${userLimit} pro Benutzer erreicht`,
        },
        guest: {
          label: `Sie haben das Limit von ${guestLimit} Voreinstellungen pro Gastbenutzer erreicht`,
          actionLabel: `um weitere Voreinstellungen zu erhalten`,
        },
      },
    },
  },
  es: {
    presets: {
      userPresets: 'Your presets',
      updatePreset: {
        label: 'Update',
        dialogTitle: 'Update preset',
        dialogMessage:
          'Confirm to update the selected preset to the current editor state',
        old: 'Old',
        new: 'New',
      },
      renamePreset: {
        label: 'Rename',
        confirmTitle: 'Rename preset',
        confirmMessage: 'Enter a new name for the preset.',
      },
      addPreset: {
        label: 'Add preset',
        confirmTitle: 'Add a new preset',
        confirmMessage: 'Enter a name for your preset',
      },
      deletePreset: {
        label: 'Delete',
        confirmTitle: 'Delete preset',
        confirmMessage: 'This action is not reversible.',
      },
      sync: {
        label: 'Save in your account',
      },
      openPreset: {
        label: 'Show your presets',
      },
      limit: {
        user: {
          label: `Alcanzaste el maximo de ${userLimit} presets`,
        },
        guest: {
          label: `Alcanzaste el maximo de ${guestLimit} presets`,
          actionLabel: `para salvar mas presets`,
        },
      },
    },
  },
};

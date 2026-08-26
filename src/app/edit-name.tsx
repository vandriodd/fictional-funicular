import { useRouter } from 'expo-router';
import { useState } from 'react';

import { SheetField } from '@/components/ui/sheet-field';
import { SheetScaffold } from '@/components/ui/sheet-scaffold';
import { useProfile } from '@/state/profile';

export default function EditNameSheet() {
  const router = useRouter();
  const { name, setName } = useProfile();
  const [draft, setDraft] = useState(name);

  const save = () => {
    setName(draft.trim());
    router.back();
  };

  return (
    <SheetScaffold
      title="Edit name"
      actionLabel="Change name"
      onAction={save}
      actionDisabled={draft.trim().length === 0}>
      <SheetField
        value={draft}
        onChangeText={setDraft}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={save}
      />
    </SheetScaffold>
  );
}

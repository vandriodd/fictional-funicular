import { useRouter } from 'expo-router';
import { useState } from 'react';

import { SheetField } from '@/components/ui/sheet-field';
import { SheetScaffold } from '@/components/ui/sheet-scaffold';
import { useProfile } from '@/state/profile';

export default function ChangeEmailSheet() {
  const router = useRouter();
  const { email, setEmail } = useProfile();
  const [draft, setDraft] = useState(email);

  const save = () => {
    setEmail(draft.trim());
    router.back();
  };

  return (
    <SheetScaffold
      title="Change email"
      actionLabel="Change email"
      onAction={save}
      actionDisabled={!draft.includes('@')}>
      <SheetField
        label="New email"
        value={draft}
        onChangeText={setDraft}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={save}
      />
    </SheetScaffold>
  );
}

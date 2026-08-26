import { useRouter } from 'expo-router';
import { useState } from 'react';

import { SheetField } from '@/components/ui/sheet-field';
import { SheetScaffold } from '@/components/ui/sheet-scaffold';

export default function ChangePasswordSheet() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  const canSave = current.length > 0 && next.length > 0 && next === confirm;

  return (
    <SheetScaffold
      title="Change password"
      actionLabel="Change password"
      onAction={() => router.back()}
      actionDisabled={!canSave}>
      <SheetField
        label="Current password"
        value={current}
        onChangeText={setCurrent}
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
      />
      <SheetField
        label="New password"
        value={next}
        onChangeText={setNext}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
      />
      <SheetField
        label="Confirm new"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
      />
    </SheetScaffold>
  );
}

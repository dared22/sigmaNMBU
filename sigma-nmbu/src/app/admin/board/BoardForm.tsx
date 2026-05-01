import type { BoardMember } from '@/types/content';
import {
  AdminField,
  AdminInput,
  AdminLink,
  AdminSelect,
  AdminSubmit,
} from '../_components/AdminForm';

const classes = ['root', 'daemon', 'allocator', 'compiler', 'scheduler'];
const roleKeys = [
  'leder',
  'nestleder',
  'okonomi',
  'markeds',
  'bedrift',
  'arrangement',
  'administrasjon',
];

export function BoardForm({
  action,
  member,
}: {
  action: (formData: FormData) => void | Promise<void>;
  member?: BoardMember;
}) {
  const metrics = member?.metrics ?? [
    { label: '', value: '' },
    { label: '', value: '' },
  ];

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="ID">
          <AdminInput name="id" defaultValue={member?.id} required />
        </AdminField>

        <AdminField label="Name">
          <AdminInput name="name" defaultValue={member?.name} required />
        </AdminField>

        <AdminField label="Portrait">
          <AdminInput
            name="portrait"
            defaultValue={member?.portrait ?? '/board/'}
            required
          />
        </AdminField>

        <AdminField label="Class">
          <AdminSelect name="class" defaultValue={member?.class ?? 'root'}>
            {classes.map((boardClass) => (
              <option key={boardClass} value={boardClass}>
                {boardClass}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <AdminField label="Process name">
          <AdminInput
            name="processName"
            defaultValue={member?.processName}
            required
          />
        </AdminField>

        <AdminField label="Role key">
          <AdminSelect name="roleKey" defaultValue={member?.roleKey ?? 'leder'}>
            {roleKeys.map((roleKey) => (
              <option key={roleKey} value={roleKey}>
                {roleKey}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <AdminField label="Order">
          <AdminInput
            name="order"
            type="number"
            defaultValue={member?.order ?? 1}
            required
          />
        </AdminField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1].map((index) => (
          <div key={index} className="grid gap-4 md:grid-cols-2">
            <AdminField label={`Metric ${index + 1} label`}>
              <AdminInput
                name={`metricLabel${index}`}
                defaultValue={metrics[index]?.label ?? ''}
                required
              />
            </AdminField>
            <AdminField label={`Metric ${index + 1} value`}>
              <AdminInput
                name={`metricValue${index}`}
                defaultValue={metrics[index]?.value ?? ''}
                required
              />
            </AdminField>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <AdminSubmit>Save member</AdminSubmit>
        <AdminLink href="/admin/board" variant="ghost">
          Cancel
        </AdminLink>
      </div>
    </form>
  );
}

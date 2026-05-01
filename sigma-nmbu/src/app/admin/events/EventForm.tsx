import type { AdminEventRecord } from '@/lib/events-admin';
import {
  AdminCheckbox,
  AdminField,
  AdminInput,
  AdminLink,
  AdminSelect,
  AdminSubmit,
  AdminTextarea,
} from '../_components/AdminForm';

const eventTypes = ['workshop', 'guest_lecture', 'hackathon', 'social'];
const complexities = ['o1', 'on', 'on2'];
const locales = ['nb', 'en'];

function toDatetimeLocal(timestamp: string) {
  return timestamp.slice(0, 16);
}

export function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => void | Promise<void>;
  event?: AdminEventRecord;
}) {
  const frontmatter = event?.frontmatter;

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <AdminField label="Slug">
          <AdminInput name="slug" defaultValue={frontmatter?.slug} required />
        </AdminField>

        <AdminField label="Locale">
          <AdminSelect name="locale" defaultValue={event?.locale ?? 'nb'}>
            {locales.map((locale) => (
              <option key={locale} value={locale}>
                {locale}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <AdminField label="Type">
          <AdminSelect name="type" defaultValue={frontmatter?.type ?? 'workshop'}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <AdminField label="Complexity">
          <AdminSelect
            name="complexity"
            defaultValue={frontmatter?.complexity ?? 'on'}
          >
            {complexities.map((complexity) => (
              <option key={complexity} value={complexity}>
                {complexity}
              </option>
            ))}
          </AdminSelect>
        </AdminField>

        <AdminField label="Timestamp">
          <AdminInput
            name="timestamp"
            type="datetime-local"
            defaultValue={
              frontmatter?.timestamp
                ? toDatetimeLocal(frontmatter.timestamp)
                : undefined
            }
            required
          />
        </AdminField>

        <AdminField label="Location">
          <AdminInput
            name="location"
            defaultValue={frontmatter?.location}
            required
          />
        </AdminField>

        <AdminField label="Capacity current">
          <AdminInput
            name="capacityCurrent"
            type="number"
            defaultValue={frontmatter?.capacity.current ?? 0}
            required
          />
        </AdminField>

        <AdminField label="Capacity max">
          <AdminInput
            name="capacityMax"
            type="number"
            defaultValue={frontmatter?.capacity.max ?? 0}
            required
          />
        </AdminField>

        <AdminField label="Input">
          <AdminInput name="input" defaultValue={frontmatter?.input} required />
        </AdminField>

        <AdminField label="Output">
          <AdminInput name="output" defaultValue={frontmatter?.output} required />
        </AdminField>

        <AdminField label="Speakers">
          <AdminInput
            name="speakers"
            defaultValue={frontmatter?.speakers.join(', ')}
          />
        </AdminField>

        <AdminField label="Register URL">
          <AdminInput
            name="registerUrl"
            defaultValue={frontmatter?.registerUrl ?? '#'}
            required
          />
        </AdminField>
      </div>

      <AdminField label="Excerpt">
        <AdminTextarea
          name="excerpt"
          defaultValue={frontmatter?.excerpt}
          required
        />
      </AdminField>

      <AdminCheckbox
        name="featured"
        label="Featured"
        defaultChecked={frontmatter?.featured ?? false}
      />

      <AdminField label="Content">
        <AdminTextarea
          name="content"
          defaultValue={event?.content}
          className="min-h-72"
          required
        />
      </AdminField>

      <div className="flex flex-wrap gap-3">
        <AdminSubmit>Save event</AdminSubmit>
        <AdminLink href="/admin/events" variant="ghost">
          Cancel
        </AdminLink>
      </div>
    </form>
  );
}

'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod/v4';
import { requireAdmin } from '@/lib/admin-auth';
import { getBoard, saveBoard } from '@/lib/board';
import type { BoardMember } from '@/types/content';

const boardClassSchema = z.enum([
  'root',
  'daemon',
  'allocator',
  'compiler',
  'scheduler',
]);
const roleKeySchema = z.enum([
  'leder',
  'nestleder',
  'okonomi',
  'markeds',
  'bedrift',
  'arrangement',
  'administrasjon',
]);

function getRequiredString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();

  if (!value) {
    throw new Error(`${key} is required`);
  }

  return value;
}

function parseBoardMember(formData: FormData): BoardMember {
  const order = Number(getRequiredString(formData, 'order'));

  if (!Number.isFinite(order)) {
    throw new Error('order must be a number');
  }

  return {
    id: getRequiredString(formData, 'id'),
    name: getRequiredString(formData, 'name'),
    portrait: getRequiredString(formData, 'portrait'),
    class: boardClassSchema.parse(getRequiredString(formData, 'class')),
    processName: getRequiredString(formData, 'processName'),
    roleKey: roleKeySchema.parse(getRequiredString(formData, 'roleKey')),
    order,
    metrics: [
      {
        label: getRequiredString(formData, 'metricLabel0'),
        value: getRequiredString(formData, 'metricValue0'),
      },
      {
        label: getRequiredString(formData, 'metricLabel1'),
        value: getRequiredString(formData, 'metricValue1'),
      },
    ],
  };
}

export async function createBoardMemberAction(formData: FormData) {
  await requireAdmin();
  const member = parseBoardMember(formData);
  const members = getBoard().filter((item) => item.id !== member.id);
  saveBoard([...members, member].sort((a, b) => a.order - b.order));
  redirect('/admin/board');
}

export async function updateBoardMemberAction(
  oldId: string,
  formData: FormData,
) {
  await requireAdmin();
  const member = parseBoardMember(formData);
  const members = getBoard().filter((item) => item.id !== oldId && item.id !== member.id);
  saveBoard([...members, member].sort((a, b) => a.order - b.order));
  redirect('/admin/board');
}

export async function deleteBoardMemberAction(id: string) {
  await requireAdmin();
  saveBoard(getBoard().filter((member) => member.id !== id));
  redirect('/admin/board');
}

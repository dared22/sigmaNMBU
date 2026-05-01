import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { BoardMember } from '@/types/content';

const BOARD_PATH = path.join(process.cwd(), 'content/data/board.json');

export function getBoard(): BoardMember[] {
  const raw = fs.readFileSync(BOARD_PATH, 'utf-8');
  return JSON.parse(raw) as BoardMember[];
}

export function saveBoard(members: BoardMember[]): void {
  fs.writeFileSync(BOARD_PATH, `${JSON.stringify(members, null, 2)}\n`);
  revalidatePath('/', 'layout');
}

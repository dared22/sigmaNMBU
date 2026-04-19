import type { BoardMember } from '@/types/content';

export const board: BoardMember[] = [
  {
    id: 'member-1',
    name: 'Lars Andersen',
    portrait: '/board/placeholder.svg',
    class: 'root',
    processName: 'sysadmin',
    roleKey: 'leder',
    order: 1,
    metrics: [
      { label: 'COMMITS', value: '1,247' },
      { label: 'UPTIME', value: '2yr' },
    ],
  },
  {
    id: 'member-2',
    name: 'Sofie Bakken',
    portrait: '/board/placeholder.svg',
    class: 'daemon',
    processName: 'vice_ctrl',
    roleKey: 'nestleder',
    order: 2,
    metrics: [
      { label: 'COMMITS', value: '982' },
      { label: 'UPTIME', value: '1.5yr' },
    ],
  },
  {
    id: 'member-3',
    name: 'Jonas Eriksen',
    portrait: '/board/placeholder.svg',
    class: 'allocator',
    processName: 'budget_mgr',
    roleKey: 'okonomi',
    order: 3,
    metrics: [
      { label: 'COMMITS', value: '654' },
      { label: 'UPTIME', value: '1yr' },
    ],
  },
  {
    id: 'member-4',
    name: 'Ingrid Dahl',
    portrait: '/board/placeholder.svg',
    class: 'compiler',
    processName: 'mktg_engine',
    roleKey: 'markeds',
    order: 4,
    metrics: [
      { label: 'COMMITS', value: '876' },
      { label: 'UPTIME', value: '1yr' },
    ],
  },
  {
    id: 'member-5',
    name: 'Henrik Fjeld',
    portrait: '/board/placeholder.svg',
    class: 'scheduler',
    processName: 'biz_relay',
    roleKey: 'bedrift',
    order: 5,
    metrics: [
      { label: 'COMMITS', value: '543' },
      { label: 'UPTIME', value: '0.5yr' },
    ],
  },
  {
    id: 'member-6',
    name: 'Astrid Glomsrud',
    portrait: '/board/placeholder.svg',
    class: 'scheduler',
    processName: 'event_loop',
    roleKey: 'arrangement',
    order: 6,
    metrics: [
      { label: 'COMMITS', value: '721' },
      { label: 'UPTIME', value: '1yr' },
    ],
  },
];

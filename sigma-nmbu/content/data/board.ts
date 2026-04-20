import type { BoardMember } from '@/types/content';

export const board: BoardMember[] = [
  {
    id: 'lars-andersen',
    name: 'Lars Andersen',
    portrait: '/board/lars-andersen.svg',
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
    id: 'sofie-bakken',
    name: 'Sofie Bakken',
    portrait: '/board/sofie-bakken.svg',
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
    id: 'jonas-eriksen',
    name: 'Jonas Eriksen',
    portrait: '/board/jonas-eriksen.svg',
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
    id: 'ingrid-dahl',
    name: 'Ingrid Dahl',
    portrait: '/board/ingrid-dahl.svg',
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
    id: 'henrik-fjeld',
    name: 'Henrik Fjeld',
    portrait: '/board/henrik-fjeld.svg',
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
    id: 'astrid-glomsrud',
    name: 'Astrid Glomsrud',
    portrait: '/board/astrid-glomsrud.svg',
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

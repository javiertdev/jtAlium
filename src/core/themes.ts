export interface Theme {
    bg: string;
    text: string;
    label: string;
}

export const themes: Theme[] = [
    { bg: '#70e000', text: '#006400', label: 'Jungle Green' },
    { bg: '#4caf50', text: '#004204', label: 'Emerald Green' },
    { bg: '#06ffa5', text: '#004632', label: 'Neon Green' },
    { bg: '#83d1ff', text: '#1b4965', label: 'Ocean Blue' },
    { bg: '#00f5ff', text: '#003542', label: 'Cyan Blue' },
    { bg: '#00bcd4', text: '#003b49', label: 'Turquoise' },
    { bg: '#3a86ff', text: '#001c69', label: 'Bright Blue' },
    { bg: '#8338ec', text: '#ffffff', label: 'Electric Purple' },
    { bg: '#ce255d', text: '#ffc6de', label: 'Magenta Pink' },
    { bg: '#ff006e', text: '#ffffff', label: 'Hot Pink' },
    { bg: '#e63946', text: '#4d0000', label: 'Vivid Red' },
    { bg: '#fb8500', text: '#ffffff', label: 'Vivid Orange' },
    { bg: '#ffd60a', text: '#92400e', label: 'Electric Yellow' },
    { bg: '#ffffff', text: '#000000', label: 'White' },
    { bg: '#000000', text: '#ffffff', label: 'Black' }
];
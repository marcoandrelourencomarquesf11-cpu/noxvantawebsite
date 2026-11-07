import type { Config } from 'tailwindcss';
const config: Config = {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{ink:'#08090b',panel:'#111317',line:'#25282e',signal:'#e52b35',muted:'#9298a2'},fontFamily:{sans:['Arial','Helvetica','sans-serif']}}},plugins:[]};
export default config;

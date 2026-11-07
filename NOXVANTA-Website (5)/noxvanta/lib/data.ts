export const nav=[['Home','/'],['Team','/team'],['Tactical Hub','/tactical-hub'],['Strategy Builder','/strategy-builder'],['Stats','/stats'],['Matches','/matches'],['News','/news'],['Join','/join']];
export const players=[1,2,3,4,5].map((n)=>({id:n,nick:`Player ${n}`,realName:'To be announced',role:['Duelist','Controller','Initiator','Sentinel','Flex'][n-1],agent:'Not assigned',country:'—',bio:'Placeholder profile. Replace with confirmed player information.',igl:n===1,captain:n===1,stats:{kd:'—',acs:'—',hs:'—'}}));
export const maps=['Abyss','Ascent','Bind','Breeze','Haven','Lotus','Pearl','Split','Sunset'];
export const results:{opponent:string;score:string;date:string;event:string;won:boolean}[]=[];
export const upcoming:{opponent:string;date:string;time:string;event:string}[]=[];
export const news:{slug:string;title:string;date:string;description:string}[]=[];
export const compositions:Record<string,string[]>={};

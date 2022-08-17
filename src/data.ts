export interface Group {
  name: string;
  color: string;
  folders: Folder[];
}

export interface Folder {
  name: string;
}

export interface Settings {
  theme: string;
}

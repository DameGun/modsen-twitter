type ImageProps = {
  url?: string;
  isEditable?: boolean;
  handleChange?(imageUrl: string): void;
};

export type { ImageProps };

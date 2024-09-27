import { StyleDictionaryToken, TokenTypes } from "../util";

export type FigmaToken = Omit<StyleDictionaryToken<TokenTypes>, "value"> & {
  name: string;
  alias?: string;
  code: {
    web: string;
  };
  value: string | number;
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
};

type FigmaConfigEntry = {
  name: string;
  hideFromPublishing: boolean;
  tokens: FigmaToken[];
};

export type FigmaTokenConfig = {
  version: string;
  timestamp: string;
  globalLight: FigmaConfigEntry;
  globalDark: FigmaConfigEntry;
  semanticColors: FigmaConfigEntry;
  radius: FigmaConfigEntry;
  spacing: FigmaConfigEntry;
};

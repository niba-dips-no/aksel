import { useContext } from "react";
import { LanguageProviderContext } from "../../provider/i18n/LanguageProvider";
import { get } from "./get";
import { Component, ComponentTranslation, Translations } from "./i18n.types";

/**
 * https://regex101.com/r/LYKWi3/1
 */
const REPLACE_REGEX = /{[^}]*}/g;

/* https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export function useI18n<T extends Component>(
  componentName: T,
  ...local: (ComponentTranslation<T> | undefined)[]
) {
  const languageProviderContext = useContext(LanguageProviderContext);
  const i18n = languageProviderContext.translations;

  /**
   * https://github.com/Shopify/polaris/blob/2115f9ba2f5bcbf2ad15745233501bff2db81ecf/polaris-react/src/utilities/i18n/I18n.ts#L24
   */
  const translate = (
    keypath: NestedKeyOf<Translations[T]>,
    replacements?: Record<string, string | number>,
  ) => {
    const text = get(
      keypath,
      ...local,
      ...(Array.isArray(i18n)
        ? i18n.map((t) => t[componentName])
        : [i18n[componentName]]),
    );

    if (replacements) {
      return text.replace(REPLACE_REGEX, (match) => {
        const replacement = match.substring(1, match.length - 1);

        if (replacements[replacement] === undefined) {
          const replacementData = JSON.stringify(replacements);

          throw new Error(
            `Error translating key '${keypath}'. No replacement syntax ({}) found for key '${replacement}'. The following replacements were passed: '${replacementData}'`,
          );
        }

        return replacements[replacement] as string; // can also be a number, but JS doesn't mind...
      });
    }

    return text;
  };

  return translate;
}

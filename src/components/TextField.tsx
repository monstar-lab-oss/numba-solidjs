import { Component, JSX, Show, splitProps } from "solid-js";
import { clsx } from "clsx";
import css from "@/components/TextField.module.css";

export type Props = {
  prefixElement?: JSX.Element;
  suffixElement?: JSX.Element;
  // TODO: We need to consider `autocomplete` prop
} & JSX.InputHTMLAttributes<HTMLInputElement>;

export const TextField: Component<Props> = (props) => {
  const [_, attributes] = splitProps(props, ["prefixElement", "suffixElement"]);

  return (
    <div class={clsx({ [css.style]: true })}>
      <Show when={props.prefixElement}>
        <span class={css.prefix}>{props.prefixElement}</span>
      </Show>
      <input {...attributes} autocomplete="on" list="tokyo" />
      <Show when={props.suffixElement}>
        <span class={css.suffix}>{props.suffixElement}</span>
      </Show>
    </div>
  );
};

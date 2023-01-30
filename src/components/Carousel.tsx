import { Component, createSignal, For, JSX } from "solid-js";
import { clsx } from "clsx";
import { IconButton } from "@/components/IconButton";
import { Button } from "./Button";
import css from "./Carousel.module.css";

export type Content = {
  src: string;
  body: JSX.Element;
};

export type Props = {
  onClose: () => void;
  contents: Content[];
};

export const Carousel: Component<Props> = (props) => {
  const [selected, setSelected] = createSignal(0);

  const onNext = () => {
    if (!hasNext()) return;
    setSelected(selected() + 1);
  };

  const onPrev = () => {
    if (!hasPrev()) return;
    setSelected(selected() - 1);
  };

  const hasNext = createMemo(() => {
    return selected() + 1 <= props.contents.length - 1;
  });

  const hasPrev = (): boolean => {
    return selected() - 1 >= 0;
  };

  // TODO: need refactor
  const Card = (src: string, body: JSX.Element, index: number) => {
    return (
      <div
        class={clsx({
          [css.card]: true,
          [css.cardHidden]: index !== selected(),
        })}
      >
        <div class={clsx({ [css.cardInner]: true })}>
          {/* TODO: need add alt */}
          <img src={src} />
        </div>
        {body}
      </div>
    );
  };

  // TODO: need refactor
  const Indicator = (index: number) => {
    return (
      <button
        class={clsx({
          [css.indicator]: true,
          [index === selected() ? css.indicatorActive : css.indicatorInactive]:
            true,
        })}
        onClick={() => setSelected(index)}
      ></button>
    );
  };

  return (
    <div class={clsx({ [css.style]: true })}>
      <div class={clsx({ [css.contents]: true })}>
        <div class={clsx({ [css.inner]: true })}>
          <For each={props.contents}>
            {(item, i) => Card(item.src, item.body, i())}
          </For>
        </div>
        <div class={clsx({ [css.buttonContainer]: true })}>
          <div class={clsx({ [css.buttonContainerInner]: true })}>
            <div class={clsx({ [css.skipButton]: true })}>
              <Button onClick={props.onClose} color="secondaryOutline">
                Skip
              </Button>
            </div>
            <div class={clsx({ [css.indicatorBlock]: true })}>
              <IconButton
                iconName="arrowLeft"
                iconColor="secondary"
                link
                onClick={onPrev}
                disabled={!hasPrev()}
              />
              <div class={clsx({ [css.indicatorContainer]: true })}>
                <For each={props.contents}>{(_, i) => Indicator(i())}</For>
              </div>
              <IconButton
                iconName="arrowRight"
                iconColor="secondary"
                link
                onClick={onNext}
                disabled={!hasNext()}
              />
            </div>
            <div class={clsx({ [css.getStartedButton]: true })}>
              {selected() + 1 > props.contents.length - 1 ? (
                <Button onClick={props.onClose} color="primary">
                  Get Started
                </Button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

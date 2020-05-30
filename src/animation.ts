namespace instachart {
  export type Animation = ReturnType<typeof createAnimation>

  export function createAnimation(value: number, duration: number) {
    return {
      fromValue: value,
      toValue: value,
      value: value,
      startTime: 0,
      duration: duration,
      delay: 0
    }
  }

  export function play(animation: Animation, toValue: number, startTime: number) {
    animation.startTime = startTime;
    animation.toValue = toValue;
    animation.fromValue = animation.value;
  }

  export function updateAnimation(animation: Animation, time: number) {
    if (animation.value === animation.toValue) {
      return false;
    }

    var progress = ((time - animation.startTime) - animation.delay) / animation.duration;

    if (progress < 0) {
      progress = 0;
    }

    if (progress > 1) {
      progress = 1;
    }

    var ease = -progress * (progress - 2);

    animation.value = animation.fromValue + (animation.toValue - animation.fromValue) * ease;

    return true;
  }
}

<template>
  <div class="service-item">
    <div class="date">
      <div class="circle"></div>
      {{ computedDate }}
    </div>
    <div class="service">
      {{ record.service.name }}
    </div>
    <div class="details">
      {{ record.details }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Record from '@/model/record.model.ts';
import Service from '@/model/service.model.ts';

export default defineComponent({
  name: 'ServiceItem',
  props: {
    record: {
      type: Object as PropType<Record>,
      default: new Record(
        0,
        new Date(),
        new Service(0, 'Service', 'Details'),
        'Details'
      )
    }
  },
  setup(props) {
    /**
     * Converts the date property to a readable string
     */
    const computedDate = computed(() => {
      // getting the year as a string
      const year = props.record.date.getFullYear().toString();

      // getting the month as a string
      const rawMonth = (props.record.date.getMonth() + 1).toString();
      const month = rawMonth.length == 1 ? `0${rawMonth}` : rawMonth;

      // getting the day as a string
      const rawDay = props.record.date.getDate().toString();
      const day = rawDay.length == 1 ? `0${rawDay}` : rawDay;

      // getting the hour as a string
      const rawHour = props.record.date.getHours().toString();
      const hour = rawHour.length == 1 ? `0${rawHour}` : rawHour;

      // getting the minute as a string
      const rawMinute = props.record.date.getMinutes().toString();
      const minute = rawMinute.length == 1 ? `0${rawMinute}` : rawMinute;

      // getting the day of the week
      const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
      const weekDay = weekDays[props.record.date.getDay()];

      // returning formatted date
      return `${day}/${month}/${year} (${weekDay}) @ ${hour}:${minute}`;
    });

    // expose template variables
    return { computedDate };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.service-item {
  background-color: $app-background-color-white;
  border-top: 1px solid $app-border-color;
  padding: 1rem 1.25rem;

  div.date {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;

    div.circle {
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: $app-button-color-primary;
      margin-right: 0.5rem;
    }
  }

  div.service {
    margin-bottom: 0.25rem;
  }

  &:hover {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-hover;

    div.date div.circle {
      background-color: $app-background-color-white;
    }
  }

  &:active {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-active;

    div.date div.circle {
      background-color: $app-background-color-white;
    }
  }
}
</style>

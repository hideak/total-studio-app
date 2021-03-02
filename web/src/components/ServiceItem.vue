<template>
  <div class="service-item">
    <div class="top">
      <div class="left">
        <div class="circle"></div>
        {{ computedDate }}
      </div>
      <div class="right">
        {{ computedTotal }}
      </div>
    </div>
    <div class="services">
      <div
        v-for="serviceEntry of record.services"
        :key="serviceEntry.id"
        class="service"
      >
        <div class="left">
          {{ serviceEntry.name }}
        </div>
        <div class="right">
          {{ `R$ ${serviceEntry.price.toFixed(2).replace('.', ',')}` }}
        </div>
      </div>
    </div>
    <div v-if="record.details" class="details">
      {{ record.details }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Record from '@/model/record.model.ts';
import ServiceEntry from '@/model/service-entry.model';

export default defineComponent({
  name: 'ServiceItem',
  props: {
    record: {
      type: Object as PropType<Record>,
      default: new Record(0, 0, [], new Date(), '00:00', 'Details')
    }
  },
  setup(props) {
    /**
     * Converts the date property to a readable string
     */
    const computedDate = computed(() => {
      if (!props.record.date) {
        return 'Sem informação de data';
      }

      // getting the year as a string
      const year = props.record.date.getFullYear().toString();

      // getting the month as a string
      const rawMonth = (props.record.date.getMonth() + 1).toString();
      const month = rawMonth.length == 1 ? `0${rawMonth}` : rawMonth;

      // getting the day as a string
      const rawDay = props.record.date.getDate().toString();
      const day = rawDay.length == 1 ? `0${rawDay}` : rawDay;

      // getting the hour and minute as a string
      const hourAndMinute = props.record.time
        ? props.record.time
        : 'Sem horário';

      // getting the day of the week
      const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
      const weekDay = weekDays[props.record.date.getDay()];

      // returning formatted date
      return `${day}/${month}/${year} (${weekDay}) às ${hourAndMinute}`;
    });

    /**
     * Computes the total price of the service entries
     */
    const computedTotal = computed(() => {
      const result = props.record.services
        .map((serviceEntry: ServiceEntry) => serviceEntry.price)
        .reduce((previous, current) => previous + current, 0);
      return `R$ ${result.toFixed(2).replace('.', ',')}`;
    });

    // expose template variables
    return { computedDate, computedTotal };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

div.service-item {
  background-color: $app-background-color-white;
  border-top: 1px solid $app-border-color;
  padding: 1rem 1.25rem;

  div.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    div.left {
      display: flex;
      align-items: center;

      div.circle {
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
        background-color: $app-button-color-primary;
        margin-right: 0.5rem;
      }
    }

    div.right {
      font-family: 'Roboto Condensed Regular';
      font-weight: bold;
    }
  }

  div.services {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    div.service {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div.right {
        font-family: 'Roboto Condensed Regular';
      }
    }
  }

  div.details {
    margin-top: 0.5rem;
    color: $app-font-color-faded;
  }

  &:hover {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-hover;

    div.details {
      color: $app-font-color-white;
    }

    div.top div.left div.circle {
      background-color: $app-background-color-white;
    }
  }

  &:active {
    cursor: pointer;
    color: $app-font-color-white;
    background-color: $app-button-color-alternative-active;

    div.details {
      color: $app-font-color-white;
    }

    div.top div.left div.circle {
      background-color: $app-background-color-white;
    }
  }
}
</style>

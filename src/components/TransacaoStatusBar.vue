<template>
  <div class="statusbar">
    <div class="status__progress">
      <div class="statusbar__bar"></div>
      <div
        class="statusbar__area"
        :class="{
          'statusbar__area--solicitada': status == 'Solicitada',
          'statusbar__area--processada': status == 'Processada',
          'statusbar__area--concluida': status == 'Concluída',
        }"
      >
        <div class="dot"></div>
      </div>
    </div>
    <div class="statusbar__label">
      <span
        class="text--uppercase"
        :class="{
          'fs-5 text--bold': status == 'Solicitada',
          'fs-6': status != 'Solicitada',
        }"
        >Solicitada</span
      >
      <span
        class="text--uppercase"
        :class="{
          'fs-5 text--bold': status == 'Processada',
          'fs-6': status != 'Processada',
        }"
        >Processada</span
      >
      <span
        class="text--uppercase"
        :class="{
          'fs-5 text--bold': status == 'Concluída',
          'fs-6': status != 'Concluída',
        }"
        >Concluída</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TransacaoStatusBar",
  props: ["status"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.statusbar {
    padding: 20px 30px;
  .status__progress {
    width: 100%;
    .statusbar__bar {
      height: 8px;
      width: 100%;
      background-color: $red--light;
      border-radius: 4px;
    }
    .statusbar__area {
      display: flex;
      &--solicitada {
        justify-content: start;
      }
      &--processada {
        justify-content: center;
      }
      &--concluida {
        justify-content: end;
      }
      .dot {
        width: 22px;
        height: 22px;
        border-radius: 11px;
        border: 2px solid $red--light;
        background-color: $white;
        position: relative;
        margin-left: 10px;
        top: -14px;
      }
    }
  }
  .statusbar__label {
    display: flex;
    justify-content: space-between;
  }
}
</style>
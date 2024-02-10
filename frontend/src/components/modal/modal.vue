<template>
  <Transition name="modal-animation">
    <div class="modal wrapper" tabindex="-1" >
      <div class="modal-dialog modal-xl">
        <Transition name="modal-animation-inner">
          <div class="modal-content card-size">
            <div class="modal-header">
              <h5 class="modal-title title--dark"><slot name="header"></slot></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <slot name="header-close"></slot>
              </button>
            </div>
            <div class="modal-body card-content">
                <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps(['modalActive']);
</script>

<style scoped>
.wrapper {
  background-color: #0e0e13db;
  display: block;
  max-height: 100vh;
  width: 100vw;
}
.card-size {
  max-height: 93vh;
}
.card-content {
  overflow-y: auto;
}
.title--dark {
  color: #0e0e13;
}
</style>
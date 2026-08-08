<script setup>
defineProps({
  responseSourcePath: {
    type: String,
    required: true,
  },
  responseSourceName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <header
    class="flex items-center px-8 py-4 bg-white border-b border-slate-100"
    role="banner"
  >
    <a :href="responseSourcePath" class="text-woot-500 hover:underline mr-4">
      {{ $t('SUPERADMIN.PLAYGROUND.BACK') }}
    </a>
    <div
      class="border border-solid border-slate-100 text-slate-700 mr-4 p-2 rounded-full"
    >
      <svg width="24" height="24"><use xlink:href="#icon-mist-fill" /></svg>
    </div>
    <div class="flex flex-col h-14 justify-center">
      <h1 id="page-title" class="text-base font-medium text-slate-900">
        {{ $t('SUPERADMIN.PLAYGROUND.TITLE') }}
      </h1>
      <p class="text-sm text-slate-600">
        {{ $t('SUPERADMIN.PLAYGROUND.DESCRIPTION_PREFIX') }}
        <span class="font-medium">
          {{ responseSourceName }}
        </span>
        {{ $t('SUPERADMIN.PLAYGROUND.DESCRIPTION_SUFFIX') }}
      </p>
    </div>
  </header>
</template>

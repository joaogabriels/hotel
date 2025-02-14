<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="~assets/onfly.png" style="width: 100px; height: 32px;" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

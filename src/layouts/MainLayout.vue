<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvb1aW5SbNJAGXTGNYpeKUeiLG-d0vmXjhlw&s"
            alt="Onfly" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## EmailJS Setup

The Music page contact form sends email with EmailJS.

Create a local `.env` file and add:

- `VITE_EMAILJS_SERVICE_ID=your_service_id`
- `VITE_EMAILJS_TEMPLATE_ID=your_template_id`
- `VITE_EMAILJS_PUBLIC_KEY=your_public_key`
- `VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key`

You can copy values from your EmailJS dashboard after creating a service and template.
Create a Google reCAPTCHA v2 checkbox site key and add it to `VITE_RECAPTCHA_SITE_KEY`.

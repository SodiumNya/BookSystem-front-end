<template>
  <div class="captcha">
    <canvas @click="refreshCaptcha" ref="captchaCanvas" width="120" height="40"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      captchaText: '',
    };
  },
  mounted() {
    this.context = this.$refs.captchaCanvas.getContext('2d');
    this.refreshCaptcha();
  },
  methods: {
    refreshCaptcha() {
      this.context.clearRect(0, 0, 120, 40);
      this.captchaText = this.generateRandomText();
      this.drawCaptchaText();
    },
    generateRandomText() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let text = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        text += characters[randomIndex];
      }
      return text;
    },
    drawCaptchaText() {
      this.context.font = '20px Arial';
      this.context.fillStyle = 'black';
      this.context.fillText(this.captchaText, 20, 30);
    },
  },
};
</script>

<style scoped>
.captcha {
  display: flex;
  align-items: center;
  text-align: center;
  background: #dae0e0;
}

</style>

const { EmbedBuilder, WebhookClient } = require('discord.js');

const webhookClient = new WebhookClient({
  id: '1007544639454187551',
  token: 'rMNg7G566d_6UXG4TXclDegvv7jsI92JToPREkfVnU31xxh1ShLQjkS5e6Qd_UZqTwRI',
});

const embed = new EmbedBuilder().setTitle('AIOPS-PROJECT').setColor(0x00ffff);

webhookClient.send({
  content: 'Server has crashed',
  username: 'AIOPS',
  avatarURL: 'https://ps.w.org/embed-form/assets/icon-256x256.png?rev=2612516',
  embeds: [embed],
});

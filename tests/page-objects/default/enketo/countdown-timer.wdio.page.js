const utils = require('@utils');

const xml = `<?xml version="1.0"?>
<h:html xmlns="http://www.w3.org/2002/xforms" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:h="http://www.w3.org/1999/xhtml" xmlns:jr="http://openrosa.org/javarosa" xmlns:orx="http://openrosa.org/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:cht="https://communityhealthtoolkit.org">
  <h:head>
    <h:title>Countdown timer</h:title>
    <model>
      <itext>
        <translation lang="en">
          <text id="/countdown/group/timer:label">
            <value>Text for timer</value>
          </text>
          <text id="/countdown/group:label">
            <value>Testing Timer</value>
          </text>
          <text id="/countdown/group_2/trigger:label">
            <value>Text for trigger</value>
          </text>
        </translation>
      </itext>
      <instance>
        <countdown delimiter="#" id="countdown" prefix="J1!countdown!" version="2024-03-07 00:00:00">
          <group>
            <timer/>
          </group>
          <group_2>
            <trigger cht:duration="1"/>
          </group_2>
          <meta tag="hidden">
            <instanceID/>
          </meta>
        </countdown>
      </instance>
      <instance id="contact-summary"/>
      <bind nodeset="/countdown/group/timer" readonly="true()" type="string"/>
      <bind nodeset="/countdown/group_2/trigger" required="true()"/>
      <bind calculate="concat('uuid:', uuid())" nodeset="/countdown/meta/instanceID" readonly="true()" type="string"/>
    </model>
  </h:head>
  <h:body class="pages">
    <group appearance="field-list" ref="/countdown/group">
      <label ref="jr:itext('/countdown/group:label')"/>
      <input appearance="countdown-timer" ref="/countdown/group/timer">
        <label ref="jr:itext('/countdown/group/timer:label')"/>
      </input>
    </group>
    <group ref="/countdown/group_2">
      <trigger appearance="countdown-timer" ref="/countdown/group_2/trigger">
        <label ref="jr:itext('/countdown/group_2/trigger:label')"/>
      </trigger>
    </group>
  </h:body>
</h:html>
`;

const INTERNAL_ID = 'countdown-timer';

const docs = [
  {
    _id: 'form:countdown-timer',
    internalId: INTERNAL_ID,
    title: 'Countdown Timer',
    type: 'form',
    _attachments: {
      xml: {
        content_type: 'application/octet-stream',
        data: Buffer.from(xml).toString('base64')
      }
    }
  }
];

const configureForm = (userContactDoc) => {
  return utils.seedTestData(userContactDoc, docs);
};

const clickTimer = async () => {
  const noteTimerSelector = 'form[data-form-id="countdown"] .current .or-appearance-countdown-timer canvas';
  const triggerTimerSelector = 'form[data-form-id="countdown"] .current.or-appearance-countdown-timer canvas';
  const timer = await $(`${noteTimerSelector}, ${triggerTimerSelector}`);
  await timer.click();
};

module.exports = {
  INTERNAL_ID,
  configureForm,
  clickTimer,
};

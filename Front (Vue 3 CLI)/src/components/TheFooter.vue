<template>
<div class="footer">
  <b-container>
    <b-row>
      <b-col lg="12">
        © 2022 Mini-Posts. All Rights Reserved <br/>
        <a href="https://anteyku.ru/">Created by Anteyku</a>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<style lang="less" scoped>
  @roboto: 'Roboto', sans-serif;

  .footer{
    font-family: @roboto;
    font-size: 18px;
    font-weight: 300;
    line-height: 30px;
    margin-top: 131px;
    margin-bottom: 80px;
    a{
      text-decoration: none;
      color: black;
      font-weight: 300;
      &:hover{
        color: #1976D2;
      }
    }
  }
</style>
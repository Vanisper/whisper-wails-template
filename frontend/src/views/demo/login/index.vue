<template>
    <section class="container">
        <header class="header">
            <img :src="LogoSvg" alt="logo" style="width: 40px;">
        </header>
        <main class="main">
            <div class="content-wrapper">
                <div class="content">
                    <div class="header">
                        <h1>Arco Design Pro</h1>
                        <p>开箱即用的中台前端/设计解决方案</p>
                    </div>
                    <div class="body">
                        <div class="account">
                            <MyInput label="请输入账号/手机号" theme-color="rgb(var(--primary-6))" />
                            <a-button class="button" type="primary" long size="large">继续</a-button>
                        </div>
                        <div class="alternate-action">
                            <p>没有账号？
                                <a href="https://www.arco.design" target="_blank">立即注册</a>
                            </p>
                        </div>
                        <a-divider orientation="center" style="margin-top: 36px;">
                            <span style="opacity: 0.8;white-space: nowrap;">或者</span>
                        </a-divider>
                        <!-- 其他登录方式 -->
                        <div class="other-login" style="--primary-6: 7, 193, 96;">
                            <a-button class="button" type="outline" size="large">
                                <icon-wechat size="24" style="color: #07c160;" /><span>微信</span>
                            </a-button>
                            <a-button class="button" type="outline" size="large">
                                <icon-qq size="24" style="color: #ea1c26;" /><span>QQ</span>
                            </a-button>
                            <a-button class="button" type="outline" size="large">
                                <icon-wechat size="24" style="color: #07c160;" /><span>微信</span>
                            </a-button>
                            <a-button class="button" type="outline" size="large">
                                <icon-wechat size="24" style="color: #07c160;" /><span>微信</span>
                            </a-button>
                            <a-button class="button" type="outline" size="large">
                                <icon-wechat size="24" style="color: #07c160;" /><span>微信</span>
                            </a-button>
                            <a-button class="button" type="outline" size="large">
                                <icon-wechat size="24" style="color: #07c160;" /><span>微信</span>
                            </a-button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer">
            <a href="https://www.arco.design" target="_blank">关于我们</a>
            <a-divider direction="vertical" style="border-left: 1px solid var(--color-text-1)" />
            <a href="https://www.arco.design" target="_blank">隐私策略</a>
        </footer>
    </section>
</template>

<script lang="ts" setup>
import LogoSvg from '@/assets/logo.svg?url';
import MyInput from './input.vue';
</script>

<script lang="ts">
import { PageEnum } from '@/enum/page';

export default {
    name: PageEnum.DEMO_LOGIN_NAME,
};


</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    color: var(--color-text-1);

    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 0 0;
        flex: 0 0 auto;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 80px 0;
        @media screen and (max-width: 600px) {
            padding: 0;
            .content {
                width: 100% !important;            
            }
        }
        
        .content-wrapper {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            background-color: unset;
            border-radius: 5px;
            white-space: normal;
            overflow: hidden;
            height: auto;
            align-items: center;

            .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 540px;
                width: 400px;
                .header {
                    padding: 40px 40px 24px;
                    line-height: 1.5;
                    text-align: center;
                    flex-shrink: 0;
                    display: block;

                    h1 {
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 0;
                        margin-bottom: 0;
                    }

                    p {
                        margin: 0;
                    }
                }
                
                .body {
                    padding: 0 40px 40px;
                    text-align: center;
                    flex-shrink: 0;

                    .account {
                        .button {
                            height: 50px;
                            margin-top: 24px;
                            border-radius: 6px;
                        }
                    }
                    .alternate-action {
                        text-align: center;
                        margin-top: 16px;
                        color: var(--color-text-1);
                        p {
                            a {
                                color: rgb(var(--primary-6));
                                text-decoration: none;
                                font-size: 14px;
                                padding: 4px;
                                // 不允许换行
                                white-space: nowrap;
                                
                                &:focus {
                                    outline: none;
                                    background-color: rgba(var(--primary-6), .15);
                                }
                            }
                        }
                    }
                    .other-login {
                        margin-top: 24px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;

                        .button {
                            height: 50px;
                            margin-top: 8px;
                            border-radius: 6px;
                            color: var(--color-text-1) !important;
                            border-color: #c2c8d0 !important;

                            // justify-content: left;
                            gap: 8px;
                            &:hover {
                                border-color: rgb(var(--primary-6)) !important;
                            }
                        }
                    }
                }
            }
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6e6e80;
        padding: 12px 0 24px;
        flex: 0 0 auto;

        a {
            color: var(--color-text-2);
            text-decoration: none;
            margin: 0 10px;
        }
    }
}
</style>
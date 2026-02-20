import { test, expect } from '@playwright/test';

/**
 * 登录页面测试套件
 * 测试目标: https://the-internet.herokuapp.com/login
 */
test.describe('登录页面测试', () => {
  
  test.beforeEach(async ({ page }) => {
    // 每个测试前都访问登录页面
    await page.goto('/login');
    await expect(page.locator('h2')).toContainText('Login Page');
  });

  test('成功登录', async ({ page }) => {
    // 输入正确的用户名和密码
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    
    // 点击登录按钮
    await page.click('button[type="submit"]');
    
    // 验证登录成功 - 页面跳转并显示成功消息
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
    await expect(page.locator('h2')).toContainText('Secure Area');
    
    // 截图保存
    await page.screenshot({ path: 'screenshots/login-success.png', fullPage: true });
  });

  test('用户名错误', async ({ page }) => {
    // 输入错误的用户名
    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // 验证错误提示
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
    
    // 截图保存
    await page.screenshot({ path: 'screenshots/login-wrong-username.png' });
  });

  test('密码错误', async ({ page }) => {
    // 输入错误的密码
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // 验证错误提示
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
    
    // 截图保存
    await page.screenshot({ path: 'screenshots/login-wrong-password.png' });
  });

  test('登出功能', async ({ page }) => {
    // 先登录
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    
    // 点击登出
    await page.click('a[href="/logout"]');
    
    // 验证登出成功
    await expect(page.locator('.flash.success')).toContainText('You logged out of the secure area!');
    
    // 截图保存
    await page.screenshot({ path: 'screenshots/logout-success.png' });
  });

});
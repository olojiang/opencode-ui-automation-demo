import { test, expect } from '@playwright/test';

/**
 * 表单验证测试套件
 * 测试目标: https://the-internet.herokuapp.com/forgot_password
 */
test.describe('表单验证测试', () => {
  
  test('忘记密码表单 - 邮箱格式验证', async ({ page }) => {
    await page.goto('/forgot_password');
    
    // 验证页面标题
    await expect(page.locator('h2')).toContainText('Forgot Password');
    
    // 输入有效的邮箱地址
    await page.fill('#email', 'test@example.com');
    
    // 提交表单
    await page.click('#form_submit');
    
    // 验证提交后的页面
    await expect(page.locator('h1')).toContainText('Internal Server Error');
    
    // 截图
    await page.screenshot({ path: 'screenshots/forgot-password-submit.png', fullPage: true });
  });

  test('动态加载表单', async ({ page }) => {
    await page.goto('/dynamic_loading/1');
    
    // 验证页面标题
    await expect(page.locator('h4')).toContainText('Example 1');
    
    // 点击 Start 按钮
    await page.click('button');
    
    // 等待加载完成 - 等待 "Hello World!" 出现
    await expect(page.locator('#finish h4')).toContainText('Hello World!', { timeout: 10000 });
    
    // 截图
    await page.screenshot({ path: 'screenshots/dynamic-loading.png' });
  });

  test('动态加载表单 - 隐藏元素', async ({ page }) => {
    await page.goto('/dynamic_loading/2');
    
    // 点击 Start 按钮
    await page.click('button');
    
    // 等待加载完成
    await expect(page.locator('#finish h4')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#finish h4')).toContainText('Hello World!');
    
    // 截图
    await page.screenshot({ path: 'screenshots/dynamic-loading-hidden.png' });
  });

  test('输入框交互', async ({ page }) => {
    await page.goto('/inputs');
    
    // 验证页面标题
    await expect(page.locator('h3')).toContainText('Inputs');
    
    // 获取输入框
    const input = page.locator('input[type="number"]');
    
    // 清空并输入数字
    await input.fill('123');
    await expect(input).toHaveValue('123');
    
    // 输入另一个数字
    await input.fill('456');
    await expect(input).toHaveValue('456');
    
    // 使用键盘输入
    await input.clear();
    await input.pressSequentially('789');
    await expect(input).toHaveValue('789');
    
    // 截图
    await page.screenshot({ path: 'screenshots/inputs-interaction.png' });
  });

});
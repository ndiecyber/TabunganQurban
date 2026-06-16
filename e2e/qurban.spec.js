import { test, expect } from '@playwright/test';

test.describe('Tabungan Qurban Mobile Web App E2E Tests', () => {

  test('should load the dashboard and display correct mock stats', async ({ page }) => {
    await page.goto('/');

    // Check main title in mobile header
    await expect(page.locator('.dashboard-header h2:has-text("Tabungan Qurban")')).toBeVisible();
    await expect(page.locator('.dashboard-header span:has-text("DKM")')).toBeVisible();

    // Check initial mock stats (12 Shohibul, 3 Lunas, 9 Proses) - scope to the stats grid
    const statsGrid = page.locator('.stats-grid');
    await expect(statsGrid.locator('text=12')).toBeVisible();
    await expect(statsGrid.locator('text=3')).toBeVisible();
    await expect(statsGrid.locator('text=9')).toBeVisible();

    // Check progress percentage (66%)
    await expect(page.locator('.progress-widget >> text=66%')).toBeVisible();
  });

  test('should navigate to Shohibul page and search for members', async ({ page }) => {
    await page.goto('/');

    // Click Shohibul navigation tab in the bottom nav specifically
    await page.click('nav.fixed >> text=Shohibul');
    await expect(page).toHaveURL(/\/shohibul/);

    // Check header text
    await expect(page.locator('h2:has-text("Daftar Shohibul")')).toBeVisible();

    // Search for 'Budi Santoso'
    const searchInput = page.locator('input[placeholder*="Cari nama"]');
    await searchInput.fill('Budi Santoso');

    // Should filter and show Budi Santoso card in the container
    await expect(page.locator('.shohibul-cards-container >> text=Budi Santoso').first()).toBeVisible();

    // Filter by "Lunas" button
    await page.click('.filter-scroll button:has-text("Lunas")');
    // Budi Santoso (Sapi share) is lunas
    await expect(page.locator('.shohibul-cards-container >> text=Budi Santoso').first()).toBeVisible();
  });

  test('should show details modal when clicking on a shohibul card', async ({ page }) => {
    await page.goto('/shohibul');

    // Click on Budi Santoso card specifically in the list
    await page.click('.shohibul-cards-container >> text=Budi Santoso >> xpath=.. >> xpath=..');

    // Details modal should slide up (check heading inside modal)
    const modal = page.locator('.absolute.inset-0.bg-black\\/60');
    await expect(modal.locator('h3:has-text("Budi Santoso")').first()).toBeVisible();
    await expect(modal.locator('text=Sapi Kelompok A')).toBeVisible();
    await expect(modal.locator('text=Lunas')).toBeVisible();
    await expect(modal.locator('text=100% Terkumpul')).toBeVisible();

    // Close modal
    await modal.locator('button:has-text("Kembali")').click();
    await expect(modal).not.toBeVisible();
  });

  test('should calculate target in Kalkulator tab', async ({ page }) => {
    await page.goto('/menabung');

    // Click Kalkulator tab
    await page.click('text=Kalkulator Target');

    // Click "🐄 Sapi Share" (price Rp 3.000.000)
    await page.click('text=Sapi Share');

    // Change slider value to 10 months
    const slider = page.locator('input[type="range"]');
    await slider.fill('10');

    // Estimasi per bulan should show: Rp3.000.000 / 10 months = Rp300.000
    await expect(page.locator('text=Rp300.000 / bulan')).toBeVisible();
  });

  test('should simulate a deposit and update dashboard statistics', async ({ page }) => {
    await page.goto('/menabung');

    // Select Shohibul (Ahmad Fauzi)
    await page.selectOption('select', { label: 'Ahmad Fauzi (Sapi - A05)' });

    // Click quick amount button for +1jt
    await page.click('button:has-text("+Rp1 jt")');

    // Click Continue to Payment
    await page.click('text=Lanjutkan Pembayaran');

    // QRIS scan details should show
    await expect(page.locator('text=Pembayaran QRIS DKM Masjid')).toBeVisible();
    // Use tag-specific match to avoid VA sub-label mismatch
    await expect(page.locator('h4:has-text("Rp1.000.000")')).toBeVisible();

    // Confirm payment simulation
    await page.click('text=Saya Sudah Membayar (Simulasi)');

    // Success overlay should appear
    await expect(page.locator('text=Pembayaran Berhasil!')).toBeVisible();

    // Verify name in success modal is indeed Ahmad Fauzi
    await expect(page.locator('.success-text >> text=Ahmad Fauzi')).toBeVisible();

    // Click Selesai, which routes to Dashboard
    await page.click('text=Selesai');
    await expect(page).toHaveURL(/\/$/);

    // Total collected before: 55.700.000. After adding 1.000.000, should show 56.700.000 (which is 68% progress)
    await expect(page.locator('text=Rp56.700.000')).toBeVisible();
    await expect(page.locator('text=68%')).toBeVisible();
  });

});

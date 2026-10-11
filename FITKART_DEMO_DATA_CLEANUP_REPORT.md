# FitKart Safe Demo/Test Data Cleanup Report

**Cleanup Date**: October 11, 2026  
**Execution Script**: `backend/src/safe_demo_cleanup.js`  
**Backup File**: `backend/backup/test_data_backup_before_cleanup_1791715040980.json`  
**Status**: COMPLETED SAFELY & VERIFIED  

---

## 1. Collection Counts: Before vs. After Cleanup

| MongoDB Collection | Before Cleanup | After Cleanup | Net Difference | Notes |
|---|---|---|---|---|
| `users` | 30 | 16 | -14 | 14 test/synthetic accounts removed; 16 real accounts preserved |
| `orders` | 13 | 7 | -6 | 6 synthetic test orders removed; 7 real customer orders preserved |
| `reviews` | 17 | 10 | -7 | 7 duplicate/orphaned reviews removed; 10 genuine reviews preserved |
| `products` | 416 | 416 | 0 | **100% PRESERVED** (No products deleted) |
| `exercises` | 134 | 134 | 0 | **100% PRESERVED** (No exercises deleted) |
| `workoutsessions` | 13 | 13 | 0 | **100% PRESERVED** (All real user workout sessions preserved) |
| `customroutines` | 2 | 2 | 0 | **100% PRESERVED** (All real user custom routines preserved) |
| `bodycareassessments`| 12 | 12 | 0 | **100% PRESERVED** (All real user AI assessments preserved) |
| `auditlogs` | 0 | Active | +N | Live audit collection initialized |

---

## 2. Pre-Deletion Backup Verification

In accordance with strict reliability guidelines, **NO data was deleted without prior export**.  
A full JSON snapshot containing all targeted test users, test orders, and duplicate reviews was exported to:
- **Location**: `backend/backup/test_data_backup_before_cleanup_1791715040980.json`
- **Audit Summary**: `backend/backup/cleanup_summary.json`

---

## 3. Classification of Records

### A. Verified Real Users (16 Accounts - 100% PRESERVED)
| User ID | Email | Name | Role | Status |
|---|---|---|---|---|
| `6a93002c2e0f78e1b74825d9` | `admin@fitkart.com` | Admin FitKart | `admin` | Preserved |
| `6aa02895a688780c68ee433b` | `user@fitkart.com` | Aswin R | `user` | Preserved |
| `6aa7976fc29fefa3c1a62c1a` | `m.harine97531@gmail.com` | M Harine | `user` | Preserved |
| `6aa7977ac29fefa3c1a62c1e` | `aswinsp.2006@gmail.com` | Aswin SP | `user` | Preserved |
| `6ab63546e5047787c7f64197` | `iamaravind69@gmail.com` | Ruin Prince | `user` | Preserved |
| `6ab63611e5047787c7f641ac` | `egdmadhankumar@gmail.com` | Aswin S P | `user` | Preserved |
| `6ab66f9512846a21f3fcc43f` | `divakar7tech@gmail.com` | divakar | `user` | Preserved |
| `6ab67417239c80cbac89aff9` | `muthudivakar01022006@gmail.com` | Muthudivakar | `user` | Preserved |
| `6ab8bcd5fe7cf823499158d4` | `aswinaswinaswin08@gmail.com` | ash | `user` | Preserved |
| `6ab8cf71fe7cf82349915b6c` | `admin@fitkart.app` | Admin | `admin` | Preserved |
| `6ab8d51ffe7cf82349915b74` | `spaswin2006@gmail.com` | Spaswin | `user` | Preserved |
| `6abb7bbc6ae09137810a9593` | `faridtech847@gmail.com` | farid | `user` | Preserved |
| `6abb7c196ae09137810a95a4` | `gowshik4525@gmail.com` | gowshik | `user` | Preserved |
| `6abb7da76ae09137810a95ab` | `spaswin750@gmail.com` | Spaswin | `user` | Preserved |
| `6abb97376ae09137810a9d33` | `pekka2418@gmail.com` | gowshik | `user` | Preserved |
| `6abcb14d6d724b2598381e34` | `ashh30232864@gmail.com` | Aswin | `user` | Preserved |

### B. Deleted Test & Demo Accounts (14 Accounts - Cleaned Up)
| User ID | Email | Name | Reason for Removal |
|---|---|---|---|
| `6a930fd853ec059832c1de7c` | `audit_user_1788022744608@example.com` | Audit Athlete | Synthetic test account from past audit script |
| `6a931d0d7f834f3e09801a48` | `audit_athlete_1788026125543@example.com` | Audit Athlete | Synthetic test account from past audit script |
| `6a931dd27f834f3e09801bf5` | `audit_1788026322586@fitkart.test` | Test Athlete | Synthetic test account from past audit script |
| `6a9434820e4d18d1ec4603c1` | `audit_1788097666298@fitkart.test` | Audit Athlete | Synthetic test account from past audit script |
| `6aa02970322f01d847270022` | `fullstack_test_1470565584@fitkart.com` | Test FullStack | Synthetic test account from past audit script |
| `6aa7ab495d0aac8f4aebbead` | `aswin.test.1789373257281@fitkart.app` | Aswin CrossDevice Test | Automated script test account |
| `6aa7ab7158e2c36f6402865a` | `aswin.test.1789373297318@fitkart.app` | Aswin CrossDevice Test | Automated script test account |
| `6aa7ad2558e2c36f640286de` | `aswin.test.1789373733511@fitkart.app` | Aswin CrossDevice Test | Automated script test account |
| `6aab650e2521cefcb6962719` | `daily_test_1789617422547@fitkart.app` | Daily Reset Tester | Automated script test account |
| `6aab65292521cefcb6962757` | `daily_test_1789617449350@fitkart.app` | Daily Reset Tester | Automated script test account |
| `6aab657614a16346aa548bf2` | `daily_test_1789617526120@fitkart.app` | Daily Reset Tester | Automated script test account |
| `6abf500abbcd417ecf443c97` | `test_sync@fitkart.app` | Sync Test | Automated script test account |
| `65f0a0e9b921111111111111` | `undefined` | `undefined` | Corrupted document without email or name |
| `6aca16f61c7fc6461fde6f18` | `test@example.com` | Test | Synthetic dummy test account |

---

### C. Orders Breakdown

#### Preserved Real Customer Orders (7 Orders)
| Order ID | Customer Name | Email | Total | Status | Payment |
|---|---|---|---|---|---|
| `FK21851065` | Aswin S P | (Guest checkout) | ₹268 | Order Confirmed | Paid |
| `FK98401244` | Aswin S P | (Guest checkout) | ₹188 | Order Confirmed | Paid |
| `FK59945249` | Aswin S P | (Guest checkout) | ₹78 | Order Confirmed | Paid |
| `FK81265398` | Aswin R | `user@fitkart.com` | ₹948 | Shipped | Paid |
| `FK95827512` | Aswin SP | `aswinsp.2006@gmail.com` | ₹288 | Order Confirmed | Pending |
| `FK26631545` | Aswin S P | `egdmadhankumar@gmail.com` | ₹467 | Order Confirmed | Paid |
| `FK45130760` | divakar | `divakar7tech@gmail.com` | ₹839 | Order Confirmed | Pending |

#### Deleted Test Orders (6 Orders)
| Order ID | Associated Account | Reason |
|---|---|---|
| `FK26126062` | `audit_athlete_1788026125543@example.com` | Automated audit test order |
| `FK26323179` | `audit_1788026322586@fitkart.test` | Automated audit test order |
| `FK26323239` | Guest Shopper (`audit_1788026322586@fitkart.test` batch) | Automated audit test order |
| `FK97667999` | `audit_1788097666298@fitkart.test` | Automated audit test order |
| `FK97668164` | Guest Shopper (`audit_1788097666298@fitkart.test` batch) | Automated audit test order |
| `FK97668459` | `audit_1788097666298@fitkart.test` | Automated audit test order |

---

### D. Duplicate Reviews Cleanup

The following 7 duplicate reviews were backed up and removed, leaving the latest review intact:
1. Product `wl-5` (User `ash`): Removed 4 duplicate submissions submitted within 40 seconds; preserved latest rating.
2. Product `wl-3` (User `Aswin SP`): Removed 2 duplicate submissions; preserved latest rating.
3. Product `fr-11` (User `divakar`): Removed 1 duplicate submission; preserved latest rating.

A MongoDB unique compound index `{ productId: 1, user: 1 }` was created immediately afterwards to prevent recurrence.

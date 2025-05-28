# Анализ неиспользуемого кода - 2025-05-28

## 🗂️ Неиспользуемые файлы (knip)

```
yarn run v1.22.19
$ /Users/ernest/Desktop/airflip/frontend/node_modules/.bin/knip --include files
src/components/scan-link/ScanLink.tsx                                            
src/components/select/MobileCheckboxSelect.tsx                                   
src/components/select/MobileFiltersDrawer.tsx                                    
src/components/select/MobileRadioSelect.tsx                                      
src/components/select/MultiSelect.tsx                                            
src/components/select/SingleSelect.tsx                                           
src/components/tab/AnimatedTabs.tsx                                              
src/components/tab/BaseTabs.tsx                                                  
src/components/text-input/SearchInput.tsx                                        
src/components/tooltip/DustTooltip.tsx                                           
src/components/tooltip/EmptyTransactionsTooltip.tsx                              
src/components/ui/accordion.tsx                                                  
src/components/ui/breadcrumb.tsx                                                 
src/components/ui/checkbox.tsx                                                   
src/components/ui/command.tsx                                                    
src/components/ui/hover-card.tsx                                                 
src/components/ui/loader.tsx                                                     
src/components/ui/logo.tsx                                                       
src/components/ui/radio-group.tsx                                                
src/components/ui/switch.tsx                                                     
src/components/ui/tooltip.tsx                                                    
src/modules/portfolio/all-assets/NoDeposit.tsx                                   
src/modules/portfolio/components/SeparatedUsdValue.tsx                           
src/modules/portfolio/components/StatusLabel.tsx                                 
src/modules/portfolio/components/YieldPotential.tsx                              
src/modules/portfolio/components/YieldPotentialMobile.tsx                        
src/modules/portfolio/maat-activity/EmptyTransactionsState.tsx                   
src/modules/portfolio/maat-activity/useGetTokensRate.ts                          
src/modules/portfolio/maat-activity/UserTransactionItem.tsx                      
src/modules/portfolio/maat-activity/VaultTokenItem.tsx                           
src/modules/portfolio/PortfolioValueTooltip.tsx                                  
src/modules/portfolio/types.ts                                                   
src/modules/token-vaults-popover/TokenVaultsPopover.tsx                          
src/modules/tokens/charts/ApyTokensChartDesktop.tsx                              
src/modules/tokens/charts/TokensChartMobile.tsx                                  
src/modules/tokens/charts/TvlTokensChartDesktop.tsx                              
src/modules/tokens/Tokens.tsx                                                    
src/modules/transaction-block/components/CountDownTimer.tsx                      
src/modules/transaction-block/components/InputWrapper.tsx                        
src/modules/transaction-block/components/TabContent.tsx                          
src/modules/transaction-block/components/TokenInfo.tsx                           
src/modules/transaction-block/components/TVLDisplay.tsx                          
src/modules/transaction-block/components/WizardDropDown.tsx                      
src/modules/transaction-block/components/WizardStep.tsx                          
src/modules/transaction-block/deposit/components/GetCryptoButton.tsx             
src/modules/transaction-block/deposit/components/InfoBlock.tsx                   
src/modules/transaction-block/deposit/components/VaultInfoBox.tsx                
src/modules/transaction-block/deposit/components/VaultSelection.tsx              
src/modules/transaction-block/deposit/helpers/promptConfirm.ts                   
src/modules/transaction-block/deposit/helpers/reportStepsExecutionToTerminal.ts  
src/modules/transaction-block/deposit/hooks/useCheckAllowance.ts                 
src/modules/transaction-block/deposit/hooks/useStaleAmountTracking.ts            
src/modules/transaction-block/deposit/hooks/useTokensList.ts                     
src/modules/transaction-block/SelectWithoutWalletPlaceholder.tsx                 
src/modules/transaction-block/TxTypeSwither.tsx                                  
src/routes/ProtectedRoute.tsx                                                    
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

## 📦 Неиспользуемые зависимости (knip)

```
yarn run v1.22.19
$ /Users/ernest/Desktop/airflip/frontend/node_modules/.bin/knip --include dependencies
Unused dependencies (33)
@amcharts/amcharts5           package.json:20:4
@covalenthq/client-sdk        package.json:21:4
@fingerprintjs/fingerprintjs  package.json:22:4
@floating-ui/react            package.json:23:4
@lifi/wallet-management       package.json:25:4
@radix-ui/react-accordion     package.json:26:4
@radix-ui/react-checkbox      package.json:27:4
@radix-ui/react-hover-card    package.json:30:4
@radix-ui/react-menubar       package.json:31:4
@radix-ui/react-radio-group   package.json:33:4
@radix-ui/react-switch        package.json:37:4
@radix-ui/react-tooltip       package.json:39:4
@react-three/drei             package.json:40:4
@react-three/fiber            package.json:41:4
@reown/appkit-adapter-wagmi   package.json:43:4
@tanstack/react-table         package.json:45:4
@tanstack/react-virtual       package.json:46:4
@uniswap/sdk-core             package.json:49:4
cmdk                          package.json:55:4
d3                            package.json:56:4
d3-sankey                     package.json:57:4
dayjs                         package.json:58:4
ethers                        package.json:59:4
lodash                        package.json:64:4
next-i18next                  package.json:67:4
path                          package.json:68:4
qs                            package.json:69:4
react-hook-form               package.json:72:4
react-intersection-observer   package.json:75:4
recharts                      package.json:77:4
tailwind-merge                package.json:78:4
three                         package.json:80:4
zukeeper                      package.json:84:4
Unused devDependencies (19)
@tanstack/eslint-plugin-query     package.json:88:4 
eslint                            package.json:98:4 
eslint-config-airbnb              package.json:99:4 
eslint-config-airbnb-typescript   package.json:100:4
eslint-config-prettier            package.json:101:4
eslint-plugin-boundaries          package.json:102:4
eslint-plugin-import              package.json:103:4
eslint-plugin-jsx-a11y            package.json:104:4
eslint-plugin-prettier            package.json:105:4
eslint-plugin-react               package.json:106:4
eslint-plugin-react-hooks         package.json:107:4
eslint-plugin-simple-import-sort  package.json:108:4
eslint-plugin-sonarjs             package.json:109:4
eslint-plugin-tailwindcss         package.json:110:4
eslint-plugin-unicorn             package.json:111:4
eslint-plugin-unused-imports      package.json:112:4
prettier                          package.json:115:4
prettier-plugin-tailwindcss       package.json:116:4
unimported                        package.json:121:4
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

## 🔍 Анализ зависимостей (depcheck)

```
yarn run v1.22.19
$ /Users/ernest/Desktop/airflip/frontend/node_modules/.bin/depcheck
Unused dependencies
* @amcharts/amcharts5
* @floating-ui/react
* @radix-ui/react-menubar
* @react-three/drei
* @react-three/fiber
* @tanstack/react-table
* @tanstack/react-virtual
* @types/three
* d3
* d3-sankey
* lodash
* next-i18next
* path
* react-hook-form
* recharts
* three
* zukeeper
Unused devDependencies
* @tanstack/eslint-plugin-query
* @types/lodash
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser
* autoprefixer
* eslint
* eslint-config-airbnb
* eslint-config-airbnb-typescript
* eslint-config-prettier
* eslint-plugin-boundaries
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-prettier
* eslint-plugin-react
* eslint-plugin-react-hooks
* eslint-plugin-simple-import-sort
* eslint-plugin-sonarjs
* eslint-plugin-tailwindcss
* eslint-plugin-unicorn
* eslint-plugin-unused-imports
* postcss
* prettier
* prettier-plugin-tailwindcss
* unimported
Missing dependencies
* @configs/LIfiProvider: ./src/App.tsx
* @configs/r-query: ./src/App.tsx
* @configs/Web3ModalProvider: ./src/App.tsx
* @modules/theme: ./src/App.tsx
* @modules/transaction-block: ./src/App.tsx
* @routes/router.config: ./src/App.tsx
* @assets/styles: ./src/main.tsx
* @layouts/BaseLayout: ./src/routes/router.config.tsx
* @pages/swap: ./src/routes/router.config.tsx
* @pages/points: ./src/routes/router.config.tsx
* @pages/404: ./src/routes/router.config.tsx
* @modules/referal-system: ./src/pages/points/Points.tsx
* @routes/routes: ./src/pages/404/NotFound.tsx
* @assets/icons: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @components/token-icon: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @components/ui: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @constants/chains: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @hooks/common: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @utils/cn: ./src/modules/transaction-block/SelectNetworkPopover.tsx
* @components/box: ./src/modules/transaction-block/SelectWithoutWalletPlaceholder.tsx
* @api/lifi: ./src/modules/transaction-block/TransactionBlock.tsx
* @utils/formatValue: ./src/modules/transaction-block/TransactionBlock.tsx
* @constants/txTypes: ./src/modules/transaction-block/TxTypeSwither.tsx
* @constants/vaults: ./src/modules/transaction-block/utils/filterChainsByVault.ts
* @api/tokens-balance: ./src/modules/transaction-block/store/useTxStore.ts
* @constants/usdc: ./src/modules/transaction-block/deposit/DepositReviewContent.tsx
* @constants/usdt: ./src/modules/transaction-block/deposit/DepositReviewContent.tsx
* @components/universal-select-modal: ./src/modules/transaction-block/deposit/SelectDepositAssetModal.tsx
* @hooks/tokens: ./src/modules/transaction-block/deposit/SelectDepositAssetModal.tsx
* @modules/adaptive-modal: ./src/modules/transaction-block/deposit/zap-fee/Details.tsx
* @store/useHideHeaderStore: ./src/modules/transaction-block/deposit/zap-fee/ZapFee.tsx
* @constants/contract-address: ./src/modules/transaction-block/deposit/hooks/useCheckAllowance.ts
* @constants/abi: ./src/modules/transaction-block/deposit/hooks/useDepositTransaction.ts
* @constants/index: ./src/modules/transaction-block/deposit/hooks/useSwap.tsx
* @assets/images: ./src/modules/transaction-block/deposit/components/SelectChainTrigger.tsx
* @components/amount-input: ./src/modules/transaction-block/deposit/components/SwappableInputs.tsx
* @hooks/useVaultAPY: ./src/modules/transaction-block/deposit/components/VaultSelection.tsx
* @utils/phrases: ./src/modules/transaction-block/components/SuccessButton.tsx
* @api/maat-finance: ./src/modules/transaction-block/components/TVLDisplay.tsx
* @components/copy: ./src/modules/transaction-block/components/TxReviewInfo.tsx
* @utils/transform: ./src/modules/transaction-block/components/TxReviewInfo.tsx
* @components/select: ./src/modules/tokens/Tokens.tsx
* @constants/select-constant: ./src/modules/tokens/Tokens.tsx
* @pages/analytics: ./src/modules/tokens/Tokens.tsx
* @components/chart: ./src/modules/tokens/charts/ApyTokensChartDesktop.tsx
* @components/frames-select: ./src/modules/tokens/charts/ApyTokensChartDesktop.tsx
* @constants/chart-tokens: ./src/modules/tokens/charts/ApyTokensChartDesktop.tsx
* @pages/token: ./src/modules/token-vaults-popover/TokenVaultsPopover.tsx
* @components/table: ./src/modules/referal-system/components/LeaderBoard.tsx
* @hooks/useLocalSignature: ./src/modules/referal-system/components/UserInfo.tsx
* @components/tooltip: ./src/modules/portfolio/maat-activity/EmptyTransactionsState.tsx
* @components/scan-link: ./src/modules/portfolio/maat-activity/UserTransactionItem.tsx
* @constants/action-type: ./src/modules/portfolio/maat-activity/UserTransactionItem.tsx
* @utils/get-day-difference: ./src/modules/portfolio/maat-activity/UserTransactionItem.tsx
* @hooks/useBestApy: ./src/modules/portfolio/all-assets/useAllAssets.ts
* @hooks/transaction-status: ./src/modules/pending-transactions/useTransactionStatusTracker.ts
* @constants/phrases: ./src/lib/utils/phrases.ts
* @configs/wagmi: ./src/lib/hooks/web3/useEthersProvider.ts
* @api/contracts: ./src/lib/hooks/tokens/adapters.ts
* @hooks/useDebounce: ./src/lib/api/lifi/hooks/useGetTokenSwapRoute.ts
* @modules/connect-wallet: ./src/layouts/header/Header.tsx
* @modules/pending-transactions: ./src/layouts/header/Header.tsx
* @modules/points-balance: ./src/layouts/header/Header.tsx
* @components/socials: ./src/layouts/header/menu/DesktopMenu.tsx
* @hooks/useClickOutside: ./src/layouts/header/menu/DesktopMenu.tsx
* @modules/portfolio: ./src/layouts/header/components/PortfolioModal.tsx
* @components/system-message: ./src/components/universal-select-modal/UniversalSelectModal.tsx
* ws: ./dist/assets/vendor-BjXHnACd.js
* @emotion/is-prop-valid: ./dist/assets/vendor-BjXHnACd.js
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

## 📤 Неиспользуемые экспорты (ts-unused-exports)

```
yarn run v1.22.19
$ /Users/ernest/Desktop/airflip/frontend/node_modules/.bin/ts-unused-exports tsconfig.json
125 modules with unused exports
/Users/ernest/Desktop/airflip/frontend/src/components/scan-link/ScanLink.tsx: SCAN_ADDRESS_PATH_BY_CHAIN_ID, useScanLink
/Users/ernest/Desktop/airflip/frontend/src/components/select/MobileRadioSelect.tsx: MobileRadioSelect
/Users/ernest/Desktop/airflip/frontend/src/components/select/Select.tsx: Select
/Users/ernest/Desktop/airflip/frontend/src/components/select/SingleSelect.tsx: SingleSelect
/Users/ernest/Desktop/airflip/frontend/src/components/system-message/index.ts: SystemMessageProperties, SystemMessageVariant
/Users/ernest/Desktop/airflip/frontend/src/components/tab/AnimatedTabs.tsx: AnimatedTabs
/Users/ernest/Desktop/airflip/frontend/src/components/tab/BaseTabs.tsx: TabType, BaseTabs
/Users/ernest/Desktop/airflip/frontend/src/components/text-input/SearchInput.tsx: SearchInput
/Users/ernest/Desktop/airflip/frontend/src/components/token-icon/index.tsx: IconWithLabelComponent
/Users/ernest/Desktop/airflip/frontend/src/components/tooltip/DustTooltip.tsx: DustTooltip
/Users/ernest/Desktop/airflip/frontend/src/components/ui/accordion.tsx: Accordion, AccordionContent, AccordionItem, AccordionTrigger
/Users/ernest/Desktop/airflip/frontend/src/components/ui/breadcrumb.tsx: Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
/Users/ernest/Desktop/airflip/frontend/src/components/ui/button.tsx: buttonVariants
/Users/ernest/Desktop/airflip/frontend/src/components/ui/checkbox.tsx: Checkbox
/Users/ernest/Desktop/airflip/frontend/src/components/ui/command.tsx: CommandDialog, CommandEmpty, CommandInput, CommandSeparator, CommandShortcut
/Users/ernest/Desktop/airflip/frontend/src/components/ui/dialog.tsx: DialogOverlay, DialogPortal
/Users/ernest/Desktop/airflip/frontend/src/components/ui/drawer.tsx: DrawerOverlay, DrawerPortal
/Users/ernest/Desktop/airflip/frontend/src/components/ui/hover-card.tsx: HoverCard, HoverCardContent, HoverCardTrigger
/Users/ernest/Desktop/airflip/frontend/src/components/ui/loader.tsx: Loader
/Users/ernest/Desktop/airflip/frontend/src/components/ui/scroll-area.tsx: ScrollBar
/Users/ernest/Desktop/airflip/frontend/src/components/ui/select.tsx: SelectGroup, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectValue
/Users/ernest/Desktop/airflip/frontend/src/components/ui/switch.tsx: Switch
/Users/ernest/Desktop/airflip/frontend/src/layouts/header/menu/hooks/useMenu.tsx: useMenu, useMenuArray
/Users/ernest/Desktop/airflip/frontend/src/lib/api/lifi/constants.ts: API_URL
/Users/ernest/Desktop/airflip/frontend/src/lib/api/lifi/endpoints/get-quote.ts: getQuote
/Users/ernest/Desktop/airflip/frontend/src/lib/api/lifi/endpoints/get-status.ts: useStatus
/Users/ernest/Desktop/airflip/frontend/src/lib/api/lifi/endpoints/get-tokens.ts: getTokens, useGetTokens
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/types.ts: Balance, SharesBalanceResponse, ParsedSharesBalanceResponse, Token, ActionType, Action, RebalanceOperation, BenefitsDescription, Benefits, UserBadgesInfo, BurnedPointsResponse
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useAdminActions.ts: AdminActionsParameters, useAdminActions, useInfiniteAdminActions
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useCurrentStakersCount.ts: useCurrentStakersCount
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useEvents.ts: EventsParameters, useEvents, useInfiniteEvents
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useGetTransactionInfo.ts: useGetTransactionInfo
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useGetUserPoints.ts: useGetUserPoints
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useGetWithdrawChains.ts: useGetWithdrawChains
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useGetWithdrawStatus.ts: fetchWithdrawStatus, useGetWithdrawStatus
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useIncentives.ts: IncentiveParameters, useIncentives, useInfiniteIncentives
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useLastRebalances.ts: LastRebalancesType, getLastRebalances, useLastRebalances
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/usePortfolioTransactions.ts: usePortfolioTransactions
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useRebalanceVolume.ts: useRebalanceVolume
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useReports.ts: ReportParameters, useReports, useInfiniteReports
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useStrategies.ts: StrategiesParameters, useInfiniteStrategies
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useStrategiesMetrics.ts: StrategyData, useStrategiesMetrics
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useStrategy.ts: useStrategy
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/useStrategyStats.ts: useStrategyStats
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/refferal-system/useGetMessageToSign.ts: useGetMessageToSign
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/refferal-system/useGetUserBadges.ts: getUserBadges
/Users/ernest/Desktop/airflip/frontend/src/lib/api/maat-finance/refferal-system/useIsRegistered.ts: useIsRegistered

```

## 📊 Сводка

- Проанализировано: 2025-05-28
- Инструменты: knip, depcheck, ts-unused-exports
- Рекомендация: Проверьте каждый файл/зависимость перед удалением

## ⚠️ Важно

1. Не удаляйте файлы автоматически
2. Проверьте динамические импорты
3. Убедитесь что приложение работает после изменений

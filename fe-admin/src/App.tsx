import { Refine, ResourceProps } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppIcon, Header } from './components';
import { ColorModeContextProvider } from './contexts/color-mode';
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from './pages/blog-posts';
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from './pages/categories';
import {
  SystemUserList,
  SystemUserShow,
  SystemUserStore,
} from './pages/system/users';
import {
  FitIngredientList,
  FitIngredientShow,
  FitIngredientStore,
} from './pages/fit/ingredients';
import { useMount } from 'ahooks';
import { useState } from 'react';
import {
  FitRecipeList,
  FitRecipeShow,
  FitRecipeStore,
} from './pages/fit/recipes';
import {
  SystemAppList,
  SystemAppShow,
  SystemAppStore,
} from './pages/system/apps';
import {
  SystemMenuList,
  SystemMenuStore,
  SystemMenuShow,
} from './pages/system/menus';
import {
  CmsBannerList,
  CmsBannerShow,
  CmsBannerStore,
} from './pages/cms/banners';
import {
  CmsIntroductionList,
  CmsIntroductionShow,
  CmsIntroductionStore,
} from './pages/cms/introductions';

function App() {
  const [resources, setResources] = useState<ResourceProps[]>([]);
  useMount(() => {
    setResources([
      {
        name: 'cms_banners',
        list: '/cms-banners',
        create: '/cms-banners/create',
        edit: '/cms-banners/edit/:id',
        show: '/cms-banners/show/:id',
        meta: {
          label: 'Banners',
        },
      },
      {
        name: 'cms_introductions',
        list: '/cms-introductions',
        create: '/cms-introductions/create',
        edit: '/cms-introductions/edit/:id',
        show: '/cms-introductions/show/:id',
        meta: {
          label: 'Introductions',
        },
      },
      {
        name: 'fit_recipes',
        list: '/fit-recipes',
        create: '/fit-recipes/create',
        edit: '/fit-recipes/edit/:id',
        show: '/fit-recipes/show/:id',
        meta: {
          label: 'Recipes',
        },
      },
      {
        name: 'fit_ingredients',
        list: '/fit-ingredients',
        create: '/fit-ingredients/create',
        edit: '/fit-ingredients/edit/:id',
        show: '/fit-ingredients/show/:id',
        meta: {
          label: 'Ingredients',
        },
      },
      {
        name: 'system',
        meta: {
          label: 'System',
        },
      },
      {
        name: 'system_users',
        list: '/system-users',
        create: '/system-users/create',
        edit: '/system-users/edit/:id',
        show: '/system-users/show/:id',
        meta: {
          label: 'Users',
          canDelete: true,
          parent: 'system',
        },
      },
      {
        name: 'system_apps',
        list: '/system-apps',
        create: '/system-apps/create',
        edit: '/system-apps/edit/:id',
        show: '/system-apps/show/:id',
        meta: {
          label: 'Apps',
          canDelete: true,
          parent: 'system',
        },
      },
      {
        name: 'system_menus',
        list: '/system-menus',
        create: '/system-menus/create',
        edit: '/system-menus/edit/:id',
        show: '/system-menus/show/:id',
        meta: {
          label: 'Menus',
          canDelete: true,
          parent: 'system',
        },
      },
    ]);
  });

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  default: dataProvider(import.meta.env.VITE_DATA_PROVIDER_URL),
                  example: dataProvider(
                    import.meta.env.VITE_EXAMPLE_DATA_PROVIDER_URL,
                  ),
                }}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: 'blog_posts',
                    list: '/blog-posts',
                    create: '/blog-posts/create',
                    edit: '/blog-posts/edit/:id',
                    show: '/blog-posts/show/:id',
                    meta: {
                      canDelete: false,
                      dataProviderName: 'example',
                    },
                  },
                  {
                    name: 'categories',
                    list: '/categories',
                    create: '/categories/create',
                    edit: '/categories/edit/:id',
                    show: '/categories/show/:id',
                    meta: {
                      canDelete: true,
                      dataProviderName: 'example',
                    },
                  },
                  ...resources,
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: import.meta.env.VITE_REFINE_PROJECT_ID,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="Phelanz"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/cms-introductions">
                      <Route index element={<CmsIntroductionList />} />
                      <Route path="create" element={<CmsIntroductionStore />} />
                      <Route
                        path="edit/:id"
                        element={<CmsIntroductionStore />}
                      />
                      <Route
                        path="show/:id"
                        element={<CmsIntroductionShow />}
                      />
                    </Route>
                    <Route path="/cms-banners">
                      <Route index element={<CmsBannerList />} />
                      <Route path="create" element={<CmsBannerStore />} />
                      <Route path="edit/:id" element={<CmsBannerStore />} />
                      <Route path="show/:id" element={<CmsBannerShow />} />
                    </Route>
                    <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/system-users">
                      <Route index element={<SystemUserList />} />
                      <Route path="create" element={<SystemUserStore />} />
                      <Route path="edit/:id" element={<SystemUserStore />} />
                      <Route path="show/:id" element={<SystemUserShow />} />
                    </Route>
                    <Route path="/system-apps">
                      <Route index element={<SystemAppList />} />
                      <Route path="create" element={<SystemAppStore />} />
                      <Route path="edit/:id" element={<SystemAppStore />} />
                      <Route path="show/:id" element={<SystemAppShow />} />
                    </Route>
                    <Route path="/system-menus">
                      <Route index element={<SystemMenuList />} />
                      <Route path="create" element={<SystemMenuStore />} />
                      <Route path="edit/:id" element={<SystemMenuStore />} />
                      <Route path="show/:id" element={<SystemMenuShow />} />
                    </Route>
                    <Route path="/fit-ingredients">
                      <Route index element={<FitIngredientList />} />
                      <Route path="create" element={<FitIngredientStore />} />
                      <Route path="edit/:id" element={<FitIngredientStore />} />
                      <Route path="show/:id" element={<FitIngredientShow />} />
                    </Route>
                    <Route path="/fit-recipes">
                      <Route index element={<FitRecipeList />} />
                      <Route path="create" element={<FitRecipeStore />} />
                      <Route path="edit/:id" element={<FitRecipeStore />} />
                      <Route path="show/:id" element={<FitRecipeShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

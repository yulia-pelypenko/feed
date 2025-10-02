export const lineItemFormHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Create Line Item</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <form action="/line-item" method="POST" enctype="multipart/form-data"
    class="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-5">

   <div class="flex flex-col space-y-1">
    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
    <div class="flex space-x-2">
      <input id="width" name="width" type="number" placeholder="Width" required
        class="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input id="height" name="height" type="number" placeholder="Height" required
        class="border rounded px-3 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
   </div>

    <div class="flex flex-col space-y-1">
      <label for="minCpm" class="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum CPM</label>
      <input id="minCpm" name="minCpm" type="number" step="0.01" required
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="maxCpm" class="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum CPM</label>
      <input id="maxCpm" name="maxCpm" type="number" step="0.01" required
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="geo" class="text-sm font-medium text-gray-700 dark:text-gray-300">Geo</label>
      <input id="geo" name="geo" type="text"
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="adType" class="text-sm font-medium text-gray-700 dark:text-gray-300">Ad Type</label>
      <input id="adType" name="adType" type="text"
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="frequency" class="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency</label>
      <input id="frequency" name="frequency" type="number"
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div class="flex flex-col space-y-1">
      <label for="creative" class="text-sm font-medium text-gray-700 dark:text-gray-300">Creative Upload</label>
      <input id="creative" name="creative" type="file" accept="image/*,video/*"
        class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <button type="submit"
      class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full">
      Save Line Item
    </button>
  </form>
</body>
</html>
`;

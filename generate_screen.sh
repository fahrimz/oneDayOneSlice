#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

name=$1

# add new menu to Home screen
FILE_PATH="src/screens/Home/index.tsx"

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
    echo "Error: $FILE_PATH does not exist"
    exit 1
fi

# Check if the menu item already exists
if grep -q "title: '$name'" "$FILE_PATH"; then
    echo "Error: Menu item '$name' already exists"
    exit 0
fi

# create folder in screens
mkdir -p ./src/screens/"$name"
touch ./src/screens/"$name"/index.tsx
touch ./src/screens/"$name"/styles.ts

# import to index
sed -i '' "/export {/i\\
import $name from './$name';
" ./src/screens/index.ts

# add to index's export
sed -i '' "s/export {/& $name, /" ./src/screens/index.ts

# add content to screen
echo "import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {},
});" > ./src/screens/"$name"/styles.ts

echo "import React from 'react';
import {Column, Gap, Text} from '../../components';
import styles from './styles';

const $name = () => {
  return (
    <Column style={styles.container}>
      <Gap height={100} />
      <Text>$name</Text>
    </Column>
  );
};

export default $name;
" > ./src/screens/"$name"/index.tsx

# add to navigation paths
sed -i '' "/export type RootStackList = {/a\\
  $name: undefined;
" ./src/navigation/paths.ts

# Update navigation imports - add to existing import from '../screens' only
sed -i '' "/import {.*} from '..\/screens';/ s/} from/ ,$name} from/" ./src/navigation/rootNavigation.tsx

# add to Stack.Navigator
sed -i '' "/<Stack.Navigator/,/<\/Stack.Navigator>/s/<\/Stack.Navigator>/  <Stack.Screen name={RootPath.$name} component={$name} \/>\n      <\/Stack.Navigator>/" ./src/navigation/rootNavigation.tsx

# Create temporary file
TMP_FILE=$(mktemp)

# Process the file and add new menu item
awk -v screen="$name" '
    # Print line by line until we find the menu array
    /const menu: MenuItem\[\] = \[/ {
        print
        # Store the indentation
        match($0, /^[ \t]*/)
        indent = substr($0, RSTART, RLENGTH)
        # Print existing items
        while (getline && !/\];/) {
            print
        }
        # Add new menu item with same indentation
        printf "%s    {\n", indent
        printf "%s      title: '\''%s'\'',\n", indent, screen
        printf "%s      navigate: () => navigation.navigate(RootPath.%s),\n", indent, screen
        printf "%s    },\n", indent
        print
        next
    }
    # Print all other lines as is
    { print }
' "$FILE_PATH" > "$TMP_FILE"

# Check if the transformation was successful
if [ $? -eq 0 ]; then
    # Backup original file
    cp "$FILE_PATH" "${FILE_PATH}.bak"
    
    # Replace original file with modified content
    mv "$TMP_FILE" "$FILE_PATH"
    
    echo "Successfully added $name to menu items"
    echo "Backup created at ${FILE_PATH}.bak"
else
    echo "Error: Failed to modify file"
    rm "$TMP_FILE"
    exit 1
fi

# Check if package.json contains "lint" script
if grep -q '"lint"' package.json; then
  npm run lint -- --fix
fi
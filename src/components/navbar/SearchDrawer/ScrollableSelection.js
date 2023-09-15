import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Grid, useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const ScrollableSelection = ({
  items,
  searchPlaceholder,
  renderItem,
  getHref,
  isJuz = true,
  selectedItem,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredItems = items.filter(
    (item) =>
      item.value.toString().startsWith(searchQuery) ||
      item.label.toString().startsWith(searchQuery)
  );

  // handle when user press `Enter` in input box
  const handleInputSubmit = (e) => {
    e.preventDefault();
    const firstFilteredItem = filteredItems[0];
    if (filteredItems) {
      const href = getHref(firstFilteredItem.value);
      router.push(href);
    }
  };

  return (
    <Grid container direction="column" sx={{ flex: 2 }}>
      <form onSubmit={handleInputSubmit}>
        <input
          style={{
            boxSizing: "border-box",
            border: "none",
            width: "100%",
            height: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
            outline: "none",
            "&::placeholder": {
              fontSize: "18px",
              color: "red",
            },
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </form>
      <Grid>
        <List
          sx={{
            overflowY: "scroll",
            position: "relative",
            height: "inherit",
            width: "100%",
          }}
        >
          {filteredItems.map((item) => (
            <Link
              href={getHref(item.value)}
              key={item.value}
              shouldPrefetch={false}
            >
              <ListItemButton
                sx={{ display: "flex", px: 2 }}
                // ref={item.value === selectedItem ? selectedItemRef : null}
                selected={item.value === selectedItem}
              >
                {renderItem(item)}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ScrollableSelection;

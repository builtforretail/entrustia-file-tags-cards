<template>
  <div class="eft-wrapper">

    <!-- Filter Bar -->
    <div class="eft-filter-bar">
      <div class="eft-search-wrap">
        <span class="eft-search-icon">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#888" stroke-width="2"/>
            <line x1="14.5" y1="14.5" x2="19" y2="19" stroke="#888" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        <input
          class="eft-search-input"
          type="text"
          placeholder="Search by name or tag"
          :value="searchText"
          @input="searchText = $event.target.value"
        />
        <button v-if="searchText" class="eft-clear-btn" @click="searchText = ''" type="button" aria-label="Clear search">&#x2715;</button>
      </div>
      <div class="eft-dropdown-wrap">
        <select class="eft-dropdown" :value="folderFilter" @change="folderFilter = $event.target.value">
          <option value="">All Folders</option>
          <option v-for="folder in uniqueFolders" :key="folder" :value="folder">{{ folder }}</option>
        </select>
        <button v-if="folderFilter" class="eft-clear-btn eft-clear-select" @click="folderFilter = ''" type="button" aria-label="Clear folder filter">&#x2715;</button>
      </div>
      <button class="eft-reset-link" @click="resetFilters" type="button">Reset</button>
    </div>

    <!-- Cards -->
    <div
      v-for="item in filteredItems"
      :key="item.id"
      class="eft-card"
    >
      <div class="eft-card-row">
        <span class="eft-label">File Name</span>
        <span
          class="eft-value eft-link"
          @click="handleNameClick(item)"
        >{{ item.name || '—' }}</span>
      </div>

      <div class="eft-card-row">
        <span class="eft-label">Folder Name</span>
        <span
          class="eft-value eft-link"
          @click="handleFolderClick(item)"
        >{{ item.ai_folder_name || '—' }}</span>
      </div>

      <div class="eft-card-row">
        <span class="eft-label">AI Tags</span>
        <span class="eft-value eft-tags-wrap">
          <span
            v-for="(tag, idx) in parseTags(item.ai_tags)"
            :key="idx"
            class="eft-tag"
          >{{ tag }}</span>
          <span v-if="!parseTags(item.ai_tags).length" class="eft-muted">—</span>
        </span>
      </div>

      <div class="eft-card-row">
        <span class="eft-label">Date Added</span>
        <span class="eft-value">{{ formatDate(item.created_at) }}</span>
      </div>

      <div class="eft-card-row">
        <span class="eft-label">File Size</span>
        <span class="eft-value">{{ formatSize(item.size_bytes) }}</span>
      </div>

      <div class="eft-card-actions">
        <button
          class="eft-btn-open"
          :style="getOpenButtonStyle(item.id)"
          @click="handleOpenClick(item)"
          @mouseenter="setHover('open', item.id, true)"
          @mouseleave="setHover('open', item.id, false)"
          @mousedown="setActive('open', item.id, true)"
          @mouseup="setActive('open', item.id, false)"
          type="button"
        >Open</button>
        <button
          class="eft-btn-edit"
          :style="getEditButtonStyle(item.id)"
          @click="handleEditClick(item)"
          @mouseenter="setHover('edit', item.id, true)"
          @mouseleave="setHover('edit', item.id, false)"
          @mousedown="setActive('edit', item.id, true)"
          @mouseup="setActive('edit', item.id, false)"
          type="button"
        >Edit</button>
      </div>
    </div>

    <div v-if="filteredItems.length === 0" class="eft-empty">No files match your filters.</div>

  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {

    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState && props.wwEditorState.isEditing);
    /* wwEditor:end */

    // ── Internal variables ────────────────────────────────────────────
    const { value: selectedItem, setValue: setSelectedItem } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'selectedItem',
      type: 'object',
      defaultValue: {},
    });

    const { value: itemCount, setValue: setItemCount } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'itemCount',
      type: 'number',
      defaultValue: 0,
    });

    const { value: filteredCount, setValue: setFilteredCount } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'filteredCount',
      type: 'number',
      defaultValue: 0,
    });

    // ── Hover / active state ─────────────────────────────────────────
    const hoverState = ref({});
    const activeState = ref({});

    function setHover(btn, id, val) {
      var key = btn + '_' + id;
      var next = Object.assign({}, hoverState.value);
      next[key] = val;
      hoverState.value = next;
    }

    function setActive(btn, id, val) {
      var key = btn + '_' + id;
      var next = Object.assign({}, activeState.value);
      next[key] = val;
      activeState.value = next;
    }

    function getOpenButtonStyle(id) {
      var key = 'open_' + id;
      var isActive = activeState.value[key];
      var isHover = hoverState.value[key];
      if (isActive) {
        return { background: '#1e4d38', borderColor: '#1e4d38', color: '#fff' };
      }
      if (isHover) {
        return { background: '#245a40', borderColor: '#245a40', color: '#fff' };
      }
      return { background: '#2d6a4f', borderColor: '#2d6a4f', color: '#fff' };
    }

    function getEditButtonStyle(id) {
      var key = 'edit_' + id;
      var isActive = activeState.value[key];
      var isHover = hoverState.value[key];
      if (isActive) {
        return { background: '#2d6a4f', borderColor: '#2d6a4f', color: '#fff' };
      }
      if (isHover) {
        return { background: '#eaf3ee', borderColor: '#2d6a4f', color: '#2d6a4f' };
      }
      return { background: 'transparent', borderColor: '#2d6a4f', color: '#2d6a4f' };
    }

    // ── Filter state ──────────────────────────────────────────────────
    const searchText = ref('');
    const folderFilter = ref('');

    function resetFilters() {
      searchText.value = '';
      folderFilter.value = '';
    }

    // ── Processed items ────────────────────────────────────────────────
    const processedItems = computed(function() {
      var items = props.content && props.content.data ? props.content.data : [];
      if (!Array.isArray(items)) { items = []; }

      var useFormula = wwLib.wwFormula.useFormula();
      var resolveMappingFormula = useFormula.resolveMappingFormula;

      return items.map(function(item) {
        var id = resolveMappingFormula(props.content && props.content.dataIdFormula, item) || item.id || '';
        var name = resolveMappingFormula(props.content && props.content.dataNameFormula, item) || item.name || '';
        var ai_folder_name = resolveMappingFormula(props.content && props.content.dataFolderNameFormula, item) || item.ai_folder_name || '';
        var ai_tags = resolveMappingFormula(props.content && props.content.dataTagsFormula, item) || item.ai_tags || [];
        var size_bytes = resolveMappingFormula(props.content && props.content.dataSizeBytesFormula, item) || item.size_bytes || 0;
        var created_at = resolveMappingFormula(props.content && props.content.dataCreatedAtFormula, item) || item.created_at || '';

        return {
          id: id,
          name: name,
          ai_folder_name: ai_folder_name,
          ai_tags: ai_tags,
          size_bytes: size_bytes,
          created_at: created_at,
          _raw: item
        };
      });
    });

    // ── Unique folders for dropdown ────────────────────────────────────
    const uniqueFolders = computed(function() {
      var seen = {};
      var folders = [];
      processedItems.value.forEach(function(item) {
        var f = item.ai_folder_name || '';
        if (f && !seen[f]) {
          seen[f] = true;
          folders.push(f);
        }
      });
      return folders.sort();
    });

    // ── Filtered items ─────────────────────────────────────────────────
    const filteredItems = computed(function() {
      var items = processedItems.value;
      var search = (searchText.value || '').toLowerCase();
      var folder = folderFilter.value || '';

      if (search) {
        items = items.filter(function(item) {
          var nameMatch = (item.name || '').toLowerCase().indexOf(search) !== -1;
          if (nameMatch) { return true; }
          var tags = parseTags(item.ai_tags);
          var tagMatch = tags.some(function(t) {
            return t.toLowerCase().indexOf(search) !== -1;
          });
          return tagMatch;
        });
      }

      if (folder) {
        items = items.filter(function(item) {
          return (item.ai_folder_name || '') === folder;
        });
      }

      return items;
    });

    // ── Sync internal variables ────────────────────────────────────────
    watch(processedItems, function(val) {
      setItemCount(val.length);
    }, { immediate: true });

    watch(filteredItems, function(val) {
      setFilteredCount(val.length);
    }, { immediate: true });

    // ── Helpers ────────────────────────────────────────────────────────
    function parseTags(raw) {
      if (!raw) { return []; }
      if (Array.isArray(raw)) { return raw.filter(function(t) { return typeof t === 'string' && t; }); }
      if (typeof raw === 'string') {
        try {
          var parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) { return parsed.filter(function(t) { return typeof t === 'string' && t; }); }
        } catch(e) {}
        return raw.split(',').map(function(t) { return t.trim(); }).filter(function(t) { return t; });
      }
      return [];
    }

    function formatDate(val) {
      if (!val) { return '—'; }
      try {
        var d = new Date(val);
        if (isNaN(d.getTime())) { return val; }
        var yyyy = d.getFullYear();
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var dd = ('0' + d.getDate()).slice(-2);
        var hh = ('0' + d.getHours()).slice(-2);
        var min = ('0' + d.getMinutes()).slice(-2);
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
      } catch(e) {
        return val;
      }
    }

    function formatSize(bytes) {
      if (bytes === null || bytes === undefined || bytes === '') { return '—'; }
      var n = Number(bytes);
      if (isNaN(n)) { return '—'; }
      var mb = Math.round((n / (1024 * 1024)) * 100) / 100;
      return mb + ' MB';
    }

    // ── Event handlers ─────────────────────────────────────────────────
    function handleOpenClick(item) {
      setSelectedItem(item._raw || item);
      emit('trigger-event', { name: 'open-click', event: { row: item._raw || item } });
    }

    function handleEditClick(item) {
      setSelectedItem(item._raw || item);
      emit('trigger-event', { name: 'edit-click', event: { row: item._raw || item } });
    }

    function handleNameClick(item) {
      setSelectedItem(item._raw || item);
      emit('trigger-event', { name: 'name-click', event: { row: item._raw || item } });
    }

    function handleFolderClick(item) {
      setSelectedItem(item._raw || item);
      emit('trigger-event', { name: 'folder-click', event: { row: item._raw || item } });
    }

    return {
      props,
      processedItems,
      filteredItems,
      uniqueFolders,
      searchText,
      folderFilter,
      resetFilters,
      parseTags,
      formatDate,
      formatSize,
      hoverState,
      activeState,
      setHover,
      setActive,
      getOpenButtonStyle,
      getEditButtonStyle,
      handleOpenClick,
      handleEditClick,
      handleNameClick,
      handleFolderClick,
      selectedItem,
      itemCount,
      filteredCount,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  }
};
</script>

<style scoped>
.eft-wrapper {
  width: 100%;
  box-sizing: border-box;
  font-family: Inter, system-ui, sans-serif;
  font-size: 13px;
  color: #1a1a1a;
}

/* ── Filter Bar ── */
.eft-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0 12px 0;
  flex-wrap: wrap;
}

.eft-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 160px;
}

.eft-search-icon {
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
}

.eft-search-input {
  width: 100%;
  padding: 7px 30px 7px 30px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  color: #1a1a1a;
  background: #fff;
  box-sizing: border-box;
  outline: none;
}

.eft-search-input:focus {
  border-color: #2d6a4f;
}

.eft-clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
  line-height: 1;
}

.eft-dropdown-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.eft-dropdown {
  padding: 7px 28px 7px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  color: #1a1a1a;
  background: #fff;
  cursor: pointer;
  outline: none;
  appearance: auto;
}

.eft-dropdown:focus {
  border-color: #2d6a4f;
}

.eft-clear-select {
  position: static;
  transform: none;
  margin-left: 4px;
}

.eft-reset-link {
  background: none;
  border: none;
  color: #2d6a4f;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  margin-left: auto;
}

/* ── Cards ── */
.eft-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 14px 10px 14px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.eft-card-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
  border-bottom: 1px solid #f3f4f6;
  gap: 8px;
}

.eft-card-row:last-of-type {
  border-bottom: none;
}

.eft-label {
  font-weight: 600;
  color: #6b7280;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  padding-top: 2px;
  min-width: 90px;
}

.eft-value {
  color: #1a1a1a;
  font-size: 13px;
  text-align: right;
  flex: 1;
  word-break: break-word;
}

.eft-link {
  color: #2d6a4f;
  text-decoration: underline;
  cursor: pointer;
}

.eft-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-end;
}

.eft-tag {
  background: #2d6a4f;
  color: #fff;
  border-radius: 999px;
  padding: 2px 9px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.eft-muted {
  color: #9ca3af;
}

.eft-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  justify-content: flex-end;
}

.eft-btn-open,
.eft-btn-edit {
  padding: 6px 16px;
  border-radius: 6px;
  border: 1.5px solid;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: none;
}

.eft-empty {
  color: #9ca3af;
  text-align: center;
  padding: 24px 0;
  font-size: 13px;
}
</style>
